/*
 * pagination.js 2.6.0
 * A jQuery plugin to provide simple yet fully customisable pagination.
 * https://github.com/superRaytin/paginationjs
 *
 * Homepage: http://pagination.js.org
 *
 * Copyright 2014-2100, superRaytin
 * Released under the MIT license.
 */

(function (global, $) {
  if (typeof $ === 'undefined') {
    throwError('Pagination requires jQuery.');
  }

  const pluginName = 'pagination';

  const pluginHookMethod = 'addHook';

  const eventPrefix = '__pagination-';

  if ($.fn.pagination) {
    throwError(
      'plugin conflicted, the name "pagination" has been taken by another jQuery plugin.'
    );
  }

  $.fn[pluginName] = function (options) {
    if (typeof options === 'undefined') {
      return this;
    }

    const container = $(this);

    const attributes = $.extend({}, $.fn[pluginName].defaults, options);

    const pagination = {
      initialize() {
        const self = this;

        // Cache data for current instance
        if (!container.data('pagination')) {
          container.data('pagination', {});
        }

        if (self.callHook('beforeInit') === false) return;

        // Pagination has been initialized, destroy it
        if (container.data('pagination').initialized) {
          $('.paginationjs', container).remove();
        }

        // Whether to disable Pagination at the initialization
        self.disabled = !!attributes.disabled;

        // Model will be passed to the callback function
        const model = (self.model = {
          pageRange: attributes.pageRange,
          pageSize: attributes.pageSize,
        });

        // Parse dataSource to find available paging data
        self.parseDataSource(attributes.dataSource, function (dataSource) {
          // Asynchronous mode
          self.isAsync = Helpers.isString(dataSource);
          if (Helpers.isArray(dataSource)) {
            model.totalNumber = attributes.totalNumber = dataSource.length;
          }

          // Asynchronous mode and a 'totalNumberLocator' has been specified
          self.isDynamicTotalNumber =
            self.isAsync && attributes.totalNumberLocator;

          const el = self.render(true);

          // Add extra className to the pagination element
          if (attributes.className) {
            el.addClass(attributes.className);
          }

          model.el = el;

          // Append / prepend pagination element to the container
          container[attributes.position === 'bottom' ? 'append' : 'prepend'](
            el
          );

          // Bind events
          self.observer();

          // Mark pagination has been initialized
          container.data('pagination').initialized = true;

          // Call hook after initialization
          self.callHook('afterInit', el);
        });
      },

      render(isBoot) {
        const self = this;
        const { model } = self;
        const el = model.el || $('<div class="paginationjs"></div>');
        const isForced = isBoot !== true;

        self.callHook('beforeRender', isForced);

        const currentPage = model.pageNumber || attributes.pageNumber;
        const pageRange = attributes.pageRange || 0;
        const totalPage = self.getTotalPage();

        let rangeStart = currentPage - pageRange;
        let rangeEnd = currentPage + pageRange;

        if (rangeEnd > totalPage) {
          rangeEnd = totalPage;
          rangeStart = totalPage - pageRange * 2;
          rangeStart = rangeStart < 1 ? 1 : rangeStart;
        }

        if (rangeStart <= 1) {
          rangeStart = 1;
          rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
        }

        el.html(
          self.generateHTML({
            currentPage,
            pageRange,
            rangeStart,
            rangeEnd,
          })
        );

        // Whether to hide pagination when there is only one page
        if (attributes.hideOnlyOnePage) {
          el[totalPage <= 1 ? 'hide' : 'show']();
        }

        self.callHook('afterRender', isForced);

        return el;
      },

      getPageLinkTag(index) {
        const { pageLink } = attributes;
        return pageLink
          ? `<a href="${pageLink}">${index}</a>`
          : `<a>${index}</a>`;
      },

      // Generate HTML for page numbers
      generatePageNumbersHTML(args) {
        const self = this;
        const { currentPage } = args;
        const totalPage = self.getTotalPage();
        const { getPageLinkTag } = self;
        const { rangeStart } = args;
        const { rangeEnd } = args;
        let html = '';
        let i;

        const { ellipsisText } = attributes;

        const { classPrefix } = attributes;
        const pageClassName = attributes.pageClassName || '';
        const activeClassName = attributes.activeClassName || '';
        const disableClassName = attributes.disableClassName || '';

        // Display all page numbers if page range disabled
        if (attributes.pageRange === null) {
          for (i = 1; i <= totalPage; i++) {
            if (i == currentPage) {
              html += `<li class="${classPrefix}-page J-paginationjs-page ${pageClassName} ${activeClassName}" data-num="${i}"><a>${i}</a></li>`;
            } else {
              html += `<li class="${classPrefix}-page J-paginationjs-page ${pageClassName}" data-num="${i}">${getPageLinkTag(i)}</li>`;
            }
          }
          return html;
        }

        if (rangeStart <= 3) {
          for (i = 1; i < rangeStart; i++) {
            if (i == currentPage) {
              html += `<li class="${classPrefix}-page J-paginationjs-page ${pageClassName} ${activeClassName}" data-num="${i}"><a>${i}</a></li>`;
            } else {
              html += `<li class="${classPrefix}-page J-paginationjs-page ${pageClassName}" data-num="${i}">${getPageLinkTag(i)}</li>`;
            }
          }
        } else {
          if (!attributes.hideFirstOnEllipsisShow) {
            html += `<li class="${classPrefix}-page ${classPrefix}-first J-paginationjs-page ${pageClassName}" data-num="1">${getPageLinkTag(1)}</li>`;
          }
          html += `<li class="${classPrefix}-ellipsis ${disableClassName}"><a>${ellipsisText}</a></li>`;
        }

        for (i = rangeStart; i <= rangeEnd; i++) {
          if (i == currentPage) {
            html += `<li class="${classPrefix}-page J-paginationjs-page ${pageClassName} ${activeClassName}" data-num="${i}"><a>${i}</a></li>`;
          } else {
            html += `<li class="${classPrefix}-page J-paginationjs-page ${pageClassName}" data-num="${i}">${getPageLinkTag(i)}</li>`;
          }
        }

        if (rangeEnd >= totalPage - 2) {
          for (i = rangeEnd + 1; i <= totalPage; i++) {
            html += `<li class="${classPrefix}-page J-paginationjs-page ${pageClassName}" data-num="${i}">${getPageLinkTag(i)}</li>`;
          }
        } else {
          html += `<li class="${classPrefix}-ellipsis ${disableClassName}"><a>${ellipsisText}</a></li>`;

          if (!attributes.hideLastOnEllipsisShow) {
            html += `<li class="${classPrefix}-page ${classPrefix}-last J-paginationjs-page ${pageClassName}" data-num="${totalPage}">${getPageLinkTag(totalPage)}</li>`;
          }
        }

        return html;
      },

      // Generate HTML content
      generateHTML(args) {
        const self = this;
        const { currentPage } = args;
        const totalPage = self.getTotalPage();
        const { getPageLinkTag } = self;

        const totalNumber = self.getTotalNumber();

        const { pageSize } = attributes;
        const { showPrevious } = attributes;
        const { showNext } = attributes;
        const { showPageNumbers } = attributes;
        const { showNavigator } = attributes;
        const { showSizeChanger } = attributes;
        const { sizeChangerOptions } = attributes;
        const { showGoInput } = attributes;
        const { showGoButton } = attributes;

        const { prevText } = attributes;
        const { nextText } = attributes;
        const { goButtonText } = attributes;

        const { classPrefix } = attributes;
        const disableClassName = attributes.disableClassName || '';
        const ulClassName = attributes.ulClassName || '';
        const prevClassName = attributes.prevClassName || '';
        const nextClassName = attributes.nextClassName || '';

        let html = '';
        let sizeSelect = `<select class="J-paginationjs-size-select">`;
        const goInput =
          '<input type="text" class="J-paginationjs-go-pagenumber">';
        const goButton = `<input type="button" class="J-paginationjs-go-button" value="${goButtonText}">`;
        let formattedString;

        const formatSizeChanger =
          typeof attributes.formatSizeChanger === 'function'
            ? attributes.formatSizeChanger(currentPage, totalPage, totalNumber)
            : attributes.formatSizeChanger;
        const formatNavigator =
          typeof attributes.formatNavigator === 'function'
            ? attributes.formatNavigator(currentPage, totalPage, totalNumber)
            : attributes.formatNavigator;
        const formatGoInput =
          typeof attributes.formatGoInput === 'function'
            ? attributes.formatGoInput(
                goInput,
                currentPage,
                totalPage,
                totalNumber
              )
            : attributes.formatGoInput;
        const formatGoButton =
          typeof attributes.formatGoButton === 'function'
            ? attributes.formatGoButton(
                goButton,
                currentPage,
                totalPage,
                totalNumber
              )
            : attributes.formatGoButton;

        const autoHidePrevious =
          typeof attributes.autoHidePrevious === 'function'
            ? attributes.autoHidePrevious()
            : attributes.autoHidePrevious;
        const autoHideNext =
          typeof attributes.autoHideNext === 'function'
            ? attributes.autoHideNext()
            : attributes.autoHideNext;

        const header =
          typeof attributes.header === 'function'
            ? attributes.header(currentPage, totalPage, totalNumber)
            : attributes.header;
        const footer =
          typeof attributes.footer === 'function'
            ? attributes.footer(currentPage, totalPage, totalNumber)
            : attributes.footer;

        // Prepend extra contents to the pagination buttons
        if (header) {
          formattedString = self.replaceVariables(header, {
            currentPage,
            totalPage,
            totalNumber,
          });
          html += formattedString;
        }

        // Whether to display navigator
        if (showNavigator) {
          if (formatNavigator) {
            formattedString = self.replaceVariables(formatNavigator, {
              currentPage,
              totalPage,
              totalNumber,
              rangeStart: (currentPage - 1) * pageSize + 1,
              rangeEnd: Math.min(currentPage * pageSize, totalNumber),
            });
            html += `<div class="${classPrefix}-nav J-paginationjs-nav">${formattedString}</div>`;
          }
        }

        if (showPrevious || showPageNumbers || showNext) {
          html += '<div class="paginationjs-pages">';

          if (ulClassName) {
            html += `<ul class="${ulClassName}">`;
          } else {
            html += '<ul>';
          }

          // Whether to display Previous button
          if (showPrevious) {
            if (currentPage <= 1) {
              if (!autoHidePrevious) {
                html += `<li class="${classPrefix}-prev ${disableClassName} ${prevClassName}"><a>${prevText}</a></li>`;
              }
            } else {
              html += `<li class="${classPrefix}-prev J-paginationjs-previous ${prevClassName}" data-num="${currentPage - 1}" title="Previous page">${getPageLinkTag(prevText)}</li>`;
            }
          }

          // Whether to display page numbers
          if (showPageNumbers) {
            html += self.generatePageNumbersHTML(args);
          }

          // Whether to display Next button
          if (showNext) {
            if (currentPage >= totalPage) {
              if (!autoHideNext) {
                html += `<li class="${classPrefix}-next ${disableClassName} ${nextClassName}"><a>${nextText}</a></li>`;
              }
            } else {
              html += `<li class="${classPrefix}-next J-paginationjs-next ${nextClassName}" data-num="${currentPage + 1}" title="Next page">${getPageLinkTag(nextText)}</li>`;
            }
          }
          html += `</ul></div>`;
        }

        if (showSizeChanger) {
          if (Helpers.isArray(sizeChangerOptions)) {
            if (sizeChangerOptions.indexOf(pageSize) === -1) {
              sizeChangerOptions.unshift(pageSize);
              sizeChangerOptions.sort((a, b) => a - b);
            }
            for (let i = 0; i < sizeChangerOptions.length; i++) {
              sizeSelect += `<option value="${sizeChangerOptions[i]}"${sizeChangerOptions[i] === pageSize ? ' selected' : ''}>${sizeChangerOptions[i]} / page</option>`;
            }
            sizeSelect += `</select>`;
            formattedString = sizeSelect;

            if (formatSizeChanger) {
              formattedString = self.replaceVariables(formatSizeChanger, {
                length: sizeSelect,
                total: totalNumber,
              });
            }
            html += `<div class="paginationjs-size-changer">${formattedString}</div>`;
          }
        }

        // Whether to display Go input
        if (showGoInput) {
          if (formatGoInput) {
            formattedString = self.replaceVariables(formatGoInput, {
              currentPage,
              totalPage,
              totalNumber,
              input: goInput,
            });
            html += `<div class="${classPrefix}-go-input">${formattedString}</div>`;
          }
        }

        // Whether to display Go button
        if (showGoButton) {
          if (formatGoButton) {
            formattedString = self.replaceVariables(formatGoButton, {
              currentPage,
              totalPage,
              totalNumber,
              button: goButton,
            });
            html += `<div class="${classPrefix}-go-button">${formattedString}</div>`;
          }
        }

        // Append extra contents to the pagination buttons
        if (footer) {
          formattedString = self.replaceVariables(footer, {
            currentPage,
            totalPage,
            totalNumber,
          });
          html += formattedString;
        }

        return html;
      },

      // dataSource is a request URL and a 'totalNumberLocator' function specified
      // execute it to find out 'totalNumber' from the response
      findTotalNumberFromRemoteResponse(response) {
        const self = this;
        self.model.totalNumber = attributes.totalNumberLocator(response);
      },

      // Go to the specified page
      go(number, callback) {
        const self = this;
        const { model } = self;

        if (self.disabled) return;

        let pageNumber = number;
        pageNumber = parseInt(pageNumber);

        if (!pageNumber || pageNumber < 1) return;

        const { pageSize } = attributes;
        const totalNumber = self.getTotalNumber();
        const totalPage = self.getTotalPage();

        if (totalNumber > 0 && pageNumber > totalPage) return;

        // Pick paging data in synchronous mode
        if (!self.isAsync) {
          render(self.getPagingData(pageNumber));
          return;
        }

        const postData = {};
        const alias = attributes.alias || {};
        const pageSizeName = alias.pageSize ? alias.pageSize : 'pageSize';
        const pageNumberName = alias.pageNumber
          ? alias.pageNumber
          : 'pageNumber';
        postData[pageSizeName] = pageSize;
        postData[pageNumberName] = pageNumber;

        const ajaxParams =
          typeof attributes.ajax === 'function'
            ? attributes.ajax()
            : attributes.ajax;

        // If the pageNumber's value starts with 0 via Ajax
        if (ajaxParams && ajaxParams.pageNumberStartWithZero) {
          postData[pageNumberName] = pageNumber - 1;
        }

        const formatAjaxParams = {
          type: 'get',
          cache: false,
          data: {},
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          dataType: 'json',
          async: true,
        };

        $.extend(true, formatAjaxParams, ajaxParams);
        $.extend(formatAjaxParams.data, postData);

        formatAjaxParams.url = attributes.dataSource;
        formatAjaxParams.success = function (response) {
          try {
            self.model.originalResponse = response;
            if (self.isDynamicTotalNumber) {
              self.findTotalNumberFromRemoteResponse(response);
            } else {
              self.model.totalNumber = attributes.totalNumber;
            }

            const finalData = self.filterDataWithLocator(response);
            render(finalData);
          } catch (e) {
            if (typeof attributes.onError === 'function') {
              attributes.onError(e, 'ajaxSuccessHandlerError');
            } else {
              throw e;
            }
          }
        };
        formatAjaxParams.error = function (jqXHR, textStatus, errorThrown) {
          attributes.formatAjaxError &&
            attributes.formatAjaxError(jqXHR, textStatus, errorThrown);
          self.enable();
        };

        self.disable();

        if (attributes.ajaxFunction) {
          attributes.ajaxFunction(formatAjaxParams);
        } else {
          $.ajax(formatAjaxParams);
        }

        function render(data) {
          if (self.callHook('beforePaging', pageNumber) === false) return false;

          // Pagination direction
          model.direction =
            typeof model.pageNumber === 'undefined'
              ? 0
              : pageNumber > model.pageNumber
                ? 1
                : -1;

          model.pageNumber = pageNumber;

          self.render();

          if (self.disabled && self.isAsync) {
            // enable pagination
            self.enable();
          }

          // cache model data
          container.data('pagination').model = model;

          // format result data before callback invoked
          if (attributes.formatResult) {
            const cloneData = $.extend(true, [], data);
            if (!Helpers.isArray((data = attributes.formatResult(cloneData)))) {
              data = cloneData;
            }
          }

          container.data('pagination').currentPageData = data;

          self.doCallback(data, callback);

          self.callHook('afterPaging', pageNumber);

          if (pageNumber == 1) {
            self.callHook('afterIsFirstPage');
          } else if (pageNumber == self.getTotalPage()) {
            self.callHook('afterIsLastPage');
          }
        }
      },

      doCallback(data, customCallback) {
        const self = this;
        const { model } = self;

        if (typeof customCallback === 'function') {
          customCallback(data, model);
        } else if (typeof attributes.callback === 'function') {
          attributes.callback(data, model);
        }
      },

      destroy() {
        if (this.callHook('beforeDestroy') === false) return;

        this.model.el.remove();
        container.off();

        // Remove style element
        $('#paginationjs-style').remove();

        this.callHook('afterDestroy');
      },

      previous(callback) {
        this.go(this.model.pageNumber - 1, callback);
      },

      next(callback) {
        this.go(this.model.pageNumber + 1, callback);
      },

      disable() {
        const self = this;
        const source = self.isAsync ? 'async' : 'sync';

        if (self.callHook('beforeDisable', source) === false) return;

        self.disabled = true;
        self.model.disabled = true;

        self.callHook('afterDisable', source);
      },

      enable() {
        const self = this;
        const source = self.isAsync ? 'async' : 'sync';

        if (self.callHook('beforeEnable', source) === false) return;

        self.disabled = false;
        self.model.disabled = false;

        self.callHook('afterEnable', source);
      },

      refresh(callback) {
        this.go(this.model.pageNumber, callback);
      },

      show() {
        const self = this;

        if (self.model.el.is(':visible')) return;

        self.model.el.show();
      },

      hide() {
        const self = this;

        if (!self.model.el.is(':visible')) return;

        self.model.el.hide();
      },

      // Replace variables for template string
      replaceVariables(template, variables) {
        let formattedString;

        for (const key in variables) {
          const value = variables[key];
          const regexp = new RegExp(`<%=\\s*${key}\\s*%>`, 'img');

          formattedString = (formattedString || template).replace(
            regexp,
            value
          );
        }

        return formattedString;
      },

      getPagingData(number) {
        const { pageSize } = attributes;
        const { dataSource } = attributes;
        const totalNumber = this.getTotalNumber();

        const start = pageSize * (number - 1) + 1;
        const end = Math.min(number * pageSize, totalNumber);

        return dataSource.slice(start - 1, end);
      },

      getTotalNumber() {
        return this.model.totalNumber || attributes.totalNumber || 0;
      },

      getTotalPage() {
        return Math.ceil(this.getTotalNumber() / attributes.pageSize);
      },

      getLocator(locator) {
        let result;

        if (typeof locator === 'string') {
          result = locator;
        } else if (typeof locator === 'function') {
          result = locator();
        } else {
          throwError('"locator" is incorrect. Expect string or function type.');
        }

        return result;
      },

      // Filter data with "locator"
      filterDataWithLocator(dataSource) {
        const locator = this.getLocator(attributes.locator);
        let filteredData;

        // Datasource is an Object, use "locator" to locate available data
        if (Helpers.isObject(dataSource)) {
          try {
            $.each(locator.split('.'), function (index, item) {
              filteredData = (filteredData || dataSource)[item];
            });
          } catch (e) {
            // ignore
          }

          if (!filteredData) {
            throwError(`dataSource.${locator} is undefined.`);
          } else if (!Helpers.isArray(filteredData)) {
            throwError(`dataSource.${locator} should be an Array.`);
          }
        }

        return filteredData || dataSource;
      },

      parseDataSource(dataSource, callback) {
        const self = this;

        if (Helpers.isObject(dataSource)) {
          callback(
            (attributes.dataSource = self.filterDataWithLocator(dataSource))
          );
        } else if (Helpers.isArray(dataSource)) {
          callback((attributes.dataSource = dataSource));
        } else if (typeof dataSource === 'function') {
          attributes.dataSource(function (data) {
            if (!Helpers.isArray(data)) {
              throwError(
                'The parameter of "done" Function should be an Array.'
              );
            }
            self.parseDataSource.call(self, data, callback);
          });
        } else if (typeof dataSource === 'string') {
          if (/^https?|file:/.test(dataSource)) {
            attributes.ajaxDataType = 'jsonp';
          }
          callback(dataSource);
        } else {
          throwError('Unexpected dataSource type');
        }
      },

      callHook(hook) {
        const paginationData = container.data('pagination') || {};
        let result;

        const args = Array.prototype.slice.apply(arguments);
        args.shift();

        if (attributes[hook] && typeof attributes[hook] === 'function') {
          if (attributes[hook].apply(global, args) === false) {
            result = false;
          }
        }

        if (paginationData.hooks && paginationData.hooks[hook]) {
          $.each(paginationData.hooks[hook], function (index, item) {
            if (item.apply(global, args) === false) {
              result = false;
            }
          });
        }

        return result !== false;
      },

      observer() {
        const self = this;
        const { el } = self.model;

        // Go to specified page number
        container.on(`${eventPrefix}go`, function (event, pageNumber, done) {
          if (typeof pageNumber === 'string') {
            pageNumber = parseInt(pageNumber.trim());
          }

          if (!pageNumber) return;

          if (typeof pageNumber !== 'number') {
            throwError('"pageNumber" is incorrect. (Number)');
          }

          self.go(pageNumber, done);
        });

        // Page number button click listener
        el.on('click', '.J-paginationjs-page', function (event) {
          const current = $(event.currentTarget);
          const pageNumber = current.attr('data-num').trim();

          if (
            !pageNumber ||
            current.hasClass(attributes.disableClassName) ||
            current.hasClass(attributes.activeClassName)
          )
            return;

          if (self.callHook('beforePageOnClick', event, pageNumber) === false)
            return false;

          self.go(pageNumber);

          self.callHook('afterPageOnClick', event, pageNumber);

          if (!attributes.pageLink) return false;
        });

        // Previous button click listener
        el.on('click', '.J-paginationjs-previous', function (event) {
          const current = $(event.currentTarget);
          const pageNumber = current.attr('data-num').trim();

          if (!pageNumber || current.hasClass(attributes.disableClassName))
            return;

          if (
            self.callHook('beforePreviousOnClick', event, pageNumber) === false
          )
            return false;

          self.go(pageNumber);

          self.callHook('afterPreviousOnClick', event, pageNumber);

          if (!attributes.pageLink) return false;
        });

        // Next button click listener
        el.on('click', '.J-paginationjs-next', function (event) {
          const current = $(event.currentTarget);
          const pageNumber = current.attr('data-num').trim();

          if (!pageNumber || current.hasClass(attributes.disableClassName))
            return;

          if (self.callHook('beforeNextOnClick', event, pageNumber) === false)
            return false;

          self.go(pageNumber);

          self.callHook('afterNextOnClick', event, pageNumber);

          if (!attributes.pageLink) return false;
        });

        // Go button click listener
        el.on('click', '.J-paginationjs-go-button', function (event) {
          const pageNumber = $('.J-paginationjs-go-pagenumber', el).val();

          if (
            self.callHook('beforeGoButtonOnClick', event, pageNumber) === false
          )
            return false;

          container.trigger(`${eventPrefix}go`, pageNumber);

          self.callHook('afterGoButtonOnClick', event, pageNumber);
        });

        // go input enter keyup listener
        el.on('keyup', '.J-paginationjs-go-pagenumber', function (event) {
          if (event.which === 13) {
            const pageNumber = $(event.currentTarget).val();

            if (
              self.callHook('beforeGoInputOnEnter', event, pageNumber) === false
            )
              return false;

            container.trigger(`${eventPrefix}go`, pageNumber);

            // Maintain the cursor
            $('.J-paginationjs-go-pagenumber', el).focus();

            self.callHook('afterGoInputOnEnter', event, pageNumber);
          }
        });

        el.on('change', '.J-paginationjs-size-select', function (event) {
          const current = $(event.currentTarget);
          const size = parseInt(current.val());
          let currentPage = self.model.pageNumber || attributes.pageNumber;

          if (typeof size !== 'number') return;

          if (self.callHook('beforeSizeSelectorChange', event, size) === false)
            return false;

          attributes.pageSize = size;
          self.model.pageSize = size;
          self.model.totalPage = self.getTotalPage();
          if (currentPage > self.model.totalPage) {
            currentPage = self.model.totalPage;
          }
          self.go(currentPage);

          self.callHook('afterSizeSelectorChange', event, size);

          if (!attributes.pageLink) return false;
        });

        // Previous page
        container.on(`${eventPrefix}previous`, function (event, done) {
          self.previous(done);
        });

        // Next page
        container.on(`${eventPrefix}next`, function (event, done) {
          self.next(done);
        });

        // Disable
        container.on(`${eventPrefix}disable`, function () {
          self.disable();
        });

        // Enable
        container.on(`${eventPrefix}enable`, function () {
          self.enable();
        });

        // Refresh
        container.on(`${eventPrefix}refresh`, function (event, done) {
          self.refresh(done);
        });

        // Show
        container.on(`${eventPrefix}show`, function () {
          self.show();
        });

        // Hide
        container.on(`${eventPrefix}hide`, function () {
          self.hide();
        });

        // Destroy
        container.on(`${eventPrefix}destroy`, function () {
          self.destroy();
        });

        // Whether to load the default page
        const validTotalPage = Math.max(self.getTotalPage(), 1);
        let defaultPageNumber = attributes.pageNumber;

        // Default pageNumber should be 1 when totalNumber is dynamic
        if (self.isDynamicTotalNumber) {
          if (attributes.resetPageNumberOnInit) defaultPageNumber = 1;
        }

        if (attributes.triggerPagingOnInit) {
          container.trigger(
            `${eventPrefix}go`,
            Math.min(defaultPageNumber, validTotalPage)
          );
        }
      },
    };

    // Pagination has been initialized
    if (
      container.data('pagination') &&
      container.data('pagination').initialized === true
    ) {
      // Handle events
      if (isNumeric(options)) {
        // eg: container.pagination(5)
        container.trigger.call(this, `${eventPrefix}go`, options, arguments[1]);
        return this;
      }
      if (typeof options === 'string') {
        const args = Array.prototype.slice.apply(arguments);
        args[0] = eventPrefix + args[0];

        switch (options) {
          case 'previous':
          case 'next':
          case 'go':
          case 'disable':
          case 'enable':
          case 'refresh':
          case 'show':
          case 'hide':
          case 'destroy':
            container.trigger.apply(this, args);
            break;
          case 'getSelectedPageNum':
          case 'getCurrentPageNum':
            if (container.data('pagination').model) {
              return container.data('pagination').model.pageNumber;
            }
            return container.data('pagination').attributes.pageNumber;

          case 'getTotalPage':
            return Math.ceil(
              container.data('pagination').model.totalNumber /
                container.data('pagination').model.pageSize
            );
          case 'getSelectedPageData':
          case 'getCurrentPageData':
            return container.data('pagination').currentPageData;
          // Whether pagination has been disabled
          case 'isDisabled':
            return container.data('pagination').model.disabled === true;
          default:
            throwError(`Unknown action: ${options}`);
        }
        return this;
      }
      // Uninstall the old instance before initializing a new one
      uninstallPlugin(container);
    } else if (!Helpers.isObject(options)) throwError('Illegal options');

    // Check parameters
    parameterChecker(attributes);

    pagination.initialize();

    return this;
  };

  // Instance defaults
  $.fn[pluginName].defaults = {
    // Data source
    // Array | String | Function | Object
    // dataSource: '',

    // String | Function
    // locator: 'data',

    // Function
    // totalNumberLocator: function() {},

    // Total number of data items
    totalNumber: 0,

    // Default page number
    pageNumber: 1,

    // Number of data items per page
    pageSize: 10,

    // Page range (pages around current page)
    pageRange: 2,

    // Whether to display the 'Previous' button
    showPrevious: true,

    // Whether to display the 'Next' button
    showNext: true,

    // Whether to display the page buttons
    showPageNumbers: true,

    showNavigator: false,

    // Whether to display the 'Go' input
    showGoInput: false,

    // Whether to display the 'Go' button
    showGoButton: false,

    showSizeChanger: false,

    sizeChangerOptions: [10, 20, 50, 100],

    // Page link
    pageLink: '',

    // 'Previous' text
    prevText: '&lsaquo;',

    // 'Next' text
    nextText: '&rsaquo;',

    // Ellipsis text
    ellipsisText: '...',

    // 'Go' button text
    goButtonText: 'Go',

    // Additional class name(s) for the Pagination container
    // className: '',

    classPrefix: 'paginationjs',

    activeClassName: 'active',

    // class name when disabled
    disableClassName: 'disabled',

    // ulClassName: '',

    // pageClassName: '',

    // prevClassName: '',

    // nextClassName: '',

    formatNavigator: 'Total <%= totalNumber %> items',

    formatGoInput: '<%= input %>',

    formatGoButton: '<%= button %>',

    // position in the container
    position: 'bottom',

    // Auto hide previous button when current page is the first
    autoHidePrevious: false,

    // Auto hide next button when current page is the last
    autoHideNext: false,

    // header: '',

    // footer: '',

    // alias: {},

    // Whether to trigger pagination at initialization
    triggerPagingOnInit: true,

    // Whether to reset page number at initialization, it works only if dataSource is a URL and totalNumberLocator is specified
    resetPageNumberOnInit: true,

    // Whether to hide pagination when less than one page
    hideOnlyOnePage: false,

    hideFirstOnEllipsisShow: false,

    hideLastOnEllipsisShow: false,

    // Customize item's innerHTML
    callback() {},
  };

  // Hook register
  $.fn[pluginHookMethod] = function (hook, callback) {
    if (arguments.length < 2) {
      throwError('Expect 2 arguments at least.');
    }

    if (typeof callback !== 'function') {
      throwError('callback should be a function.');
    }

    const container = $(this);
    let paginationData = container.data('pagination');

    if (!paginationData) {
      container.data('pagination', {});
      paginationData = container.data('pagination');
    }

    !paginationData.hooks && (paginationData.hooks = {});

    // paginationData.hooks[hook] = callback;
    paginationData.hooks[hook] = paginationData.hooks[hook] || [];
    paginationData.hooks[hook].push(callback);
  };

  // Static method
  $[pluginName] = function (selector, options) {
    if (arguments.length < 2) {
      throwError('Requires two parameters.');
    }

    let container;

    // 'selector' is a jQuery object
    if (typeof selector !== 'string' && selector instanceof jQuery) {
      container = selector;
    } else {
      container = $(selector);
    }

    if (!container.length) return;

    container.pagination(options);

    return container;
  };

  // ============================================================
  // helpers
  // ============================================================

  var Helpers = {};

  // Throw error
  function throwError(content) {
    throw new Error(`Pagination: ${content}`);
  }

  // Check parameters
  function parameterChecker(args) {
    if (!args.dataSource) {
      throwError('"dataSource" is required.');
    }

    if (typeof args.dataSource === 'string') {
      if (args.totalNumberLocator === undefined) {
        if (args.totalNumber === undefined) {
          throwError('"totalNumber" is required.');
        } else if (!isNumeric(args.totalNumber)) {
          throwError('"totalNumber" is incorrect. Expect numberic type');
        }
      } else if (typeof args.totalNumberLocator !== 'function') {
        throwError('"totalNumberLocator" should be a Function.');
      }
    } else if (Helpers.isObject(args.dataSource)) {
      if (typeof args.locator === 'undefined') {
        throwError('"dataSource" is an Object, please specify a "locator".');
      } else if (
        typeof args.locator !== 'string' &&
        typeof args.locator !== 'function'
      ) {
        throwError(
          `${args.locator} is incorrect. Expect string or function type`
        );
      }
    }

    if (
      args.formatResult !== undefined &&
      typeof args.formatResult !== 'function'
    ) {
      throwError('"formatResult" should be a Function.');
    }

    if (args.onError !== undefined && typeof args.onError !== 'function') {
      throwError('"onError" should be a Function.');
    }
  }

  // uninstall plugin
  function uninstallPlugin(target) {
    const events = [
      'go',
      'previous',
      'next',
      'disable',
      'enable',
      'refresh',
      'show',
      'hide',
      'destroy',
    ];

    // off all events
    $.each(events, function (index, value) {
      target.off(eventPrefix + value);
    });

    // reset pagination data
    target.data('pagination', {});

    // remove pagination element
    $('.paginationjs', target).remove();
  }

  // Object type detection
  function getObjectType(object, tmp) {
    return (
      (tmp = typeof object) == 'object'
        ? (object == null && 'null') ||
          Object.prototype.toString.call(object).slice(8, -1)
        : tmp
    ).toLowerCase();
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  $.each(['Object', 'Array', 'String'], function (index, name) {
    Helpers[`is${name}`] = function (object) {
      return getObjectType(object) === name.toLowerCase();
    };
  });

  /*
   * export via AMD or CommonJS
   * */
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return $;
    });
  }
})(this, window.jQuery);
