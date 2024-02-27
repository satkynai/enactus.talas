window.isMobile = !1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.isMobile = !0
}
function t_throttle(fn, threshhold, scope) {
    var last;
    var deferTimer;
    threshhold || (threshhold = 250);
    return function() {
        var context = scope || this;
        var now = +new Date();
        var args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}
function t228__init(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menuBlock = rec.querySelector('.t228');
    var mobileMenu = rec.querySelector('.t228__mobile');
    var menuSubLinkItems = rec.querySelectorAll('.t-menusub__link-item');
    var rightBtn = rec.querySelector('.t228__right_buttons_but .t-btn');
    var mobileMenuPosition = mobileMenu ? mobileMenu.style.position || window.getComputedStyle(mobileMenu).position : '';
    var mobileMenuDisplay = mobileMenu ? mobileMenu.style.display || window.getComputedStyle(mobileMenu).display : '';
    var isFixedMobileMenu = mobileMenuPosition === 'fixed' && mobileMenuDisplay === 'block';
    var overflowEvent = document.createEvent('Event');
    var noOverflowEvent = document.createEvent('Event');
    overflowEvent.initEvent('t228_overflow', !0, !0);
    noOverflowEvent.initEvent('t228_nooverflow', !0, !0);
    if (menuBlock) {
        menuBlock.addEventListener('t228_overflow', function() {
            t228_checkOverflow(recid)
        });
        menuBlock.addEventListener('t228_nooverflow', function() {
            t228_checkNoOverflow(recid)
        })
    }
    rec.addEventListener('click', function(e) {
        var targetLink = e.target.closest('.t-menusub__target-link');
        if (targetLink && window.isMobile && window.innerWidth <= 980) {
            if (targetLink.classList.contains('t-menusub__target-link_active')) {
                if (menuBlock)
                    menuBlock.dispatchEvent(overflowEvent)
            } else {
                if (menuBlock)
                    menuBlock.dispatchEvent(noOverflowEvent)
            }
        }
        var currentLink = e.target.closest('.t-menu__link-item:not(.tooltipstered):not(.t-menusub__target-link):not(.t794__tm-link):not(.t966__tm-link):not(.t978__tm-link):not(.t978__menu-link)');
        if (currentLink && mobileMenu && isFixedMobileMenu)
            mobileMenu.click()
    });
    Array.prototype.forEach.call(menuSubLinkItems, function(linkItem) {
        linkItem.addEventListener('click', function() {
            if (mobileMenu && isFixedMobileMenu)
                mobileMenu.click()
        })
    });
    if (rightBtn) {
        rightBtn.addEventListener('click', function() {
            if (mobileMenu && isFixedMobileMenu)
                mobileMenu.click()
        })
    }
    if (menuBlock) {
        menuBlock.addEventListener('showME601a', function() {
            var menuLinks = rec.querySelectorAll('.t966__menu-link');
            Array.prototype.forEach.call(menuLinks, function(menuLink) {
                menuLink.addEventListener('click', function() {
                    if (mobileMenu && isFixedMobileMenu)
                        mobileMenu.click()
                })
            })
        })
    }
}
function t228_checkOverflow(recid) {
    var rec = document.getElementById('rec' + recid);
    var menu = rec ? rec.querySelector('.t228') : null;
    if (!menu)
        return;
    var mobileContainer = document.querySelector('.t228__mobile_container');
    var mobileContainerHeight = t228_getFullHeight(mobileContainer);
    var windowHeight = document.documentElement.clientHeight;
    var menuPosition = menu.style.position || window.getComputedStyle(menu).position;
    if (menuPosition === 'fixed') {
        menu.classList.add('t228__overflow');
        menu.style.setProperty('height', (windowHeight - mobileContainerHeight) + 'px', 'important')
    }
}
function t228_checkNoOverflow(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var menu = rec.querySelector('.t228');
    var menuPosition = menu ? menu.style.position || window.getComputedStyle(menu).position : '';
    if (menuPosition === 'fixed') {
        if (menu)
            menu.classList.remove('t228__overflow');
        if (menu)
            menu.style.height = 'auto'
    }
}
function t228_setWidth(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menuCenterSideList = rec.querySelectorAll('.t228__centerside');
    Array.prototype.forEach.call(menuCenterSideList, function(menuCenterSide) {
        menuCenterSide.classList.remove('t228__centerside_hidden')
    });
    if (window.innerWidth <= 980)
        return;
    var menuBlocks = rec.querySelectorAll('.t228');
    Array.prototype.forEach.call(menuBlocks, function(menu) {
        var maxWidth;
        var centerWidth = 0;
        var paddingWidth = 40;
        var leftSide = menu.querySelector('.t228__leftside');
        var rightSide = menu.querySelector('.t228__rightside');
        var menuList = menu.querySelector('.t228__list');
        var mainContainer = menu.querySelector('.t228__maincontainer');
        var leftContainer = menu.querySelector('.t228__leftcontainer');
        var rightContainer = menu.querySelector('.t228__rightcontainer');
        var centerContainer = menu.querySelector('.t228__centercontainer');
        var centerContainerLi = centerContainer ? centerContainer.querySelectorAll('li') : [];
        var leftContainerWidth = t228_getFullWidth(leftContainer);
        var rightContainerWidth = t228_getFullWidth(rightContainer);
        var mainContainerWidth = mainContainer ? mainContainer.offsetWidth : 0;
        var dataAlign = menu.getAttribute('data-menu-items-align');
        var isDataAlignCenter = dataAlign === 'center' || dataAlign === null;
        maxWidth = leftContainerWidth >= rightContainerWidth ? leftContainerWidth : rightContainerWidth;
        maxWidth = Math.ceil(maxWidth);
        Array.prototype.forEach.call(centerContainerLi, function(li) {
            centerWidth += t228_getFullWidth(li)
        });
        if (mainContainerWidth - (maxWidth * 2 + paddingWidth * 2) > centerWidth + 20) {
            if (isDataAlignCenter) {
                if (leftSide)
                    leftSide.style.minWidth = maxWidth + 'px';
                if (rightSide)
                    rightSide.style.minWidth = maxWidth + 'px'
            }
        } else {
            if (leftSide)
                leftSide.style.minWidth = maxWidth + '';
            if (rightSide)
                rightSide.style.minWidth = maxWidth + ''
        }
        if (menuList && menuList.classList.contains('t228__list_hidden'))
            menuList.classList.remove('t228__list_hidden')
    })
}
function t228_getFullWidth(el) {
    if (!el)
        return 0;
    var marginLeft = el.style.marginLeft || window.getComputedStyle(el).marginLeft;
    var marginRight = el.style.marginRight || window.getComputedStyle(el).marginRight;
    marginLeft = parseInt(marginLeft, 10) || 0;
    marginRight = parseInt(marginRight, 10) || 0;
    return el.offsetWidth + marginLeft + marginRight
}
function t228_getFullHeight(el) {
    if (!el)
        return 0;
    var marginTop = el.style.marginTop || window.getComputedStyle(el).marginTop;
    var marginBottom = el.style.marginBottom || window.getComputedStyle(el).marginBottom;
    marginTop = parseInt(marginTop, 10) || 0;
    marginBottom = parseInt(marginBottom, 10) || 0;
    return el.offsetHeight + marginTop + marginBottom
}
function t1029_init(recId) {
    t_onFuncLoad('t_card__moveClickOnCard', function() {
        t_card__moveClickOnCard(recId)
    });
    t_onFuncLoad('t_card__addFocusOnTab', function() {
        t_card__addFocusOnTab(recId)
    })
}
function t1108_init(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t1108');
    if (!container)
        return;
    var lines = rec.querySelectorAll('.t1108__line');
    var blocksCount = parseInt(container.getAttribute('data-blocks-count'), 10);
    var circleCount = 4;
    if (blocksCount !== 4)
        circleCount = 8;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var cirqles = line.querySelector('.t1108__cirqle');
        for (var j = 0; j < circleCount; j++) {
            line.append(cirqles.cloneNode(!0))
        }
    }
    function t1108_update() {
        var col = rec.querySelector('.t1108__col');
        var colWidth = 0;
        var bgImg = rec.querySelector('.t1108__bgimg');
        var bgWidth = 0;
        var imgMaxWidth = 0;
        if (col) {
            var colStyle = getComputedStyle(col, null);
            var colPaddingLeft = parseInt(colStyle.paddingLeft) || 0;
            var colPaddingRight = parseInt(colStyle.paddingRight) || 0;
            colWidth = col.clientWidth - (colPaddingLeft + colPaddingRight)
        }
        if (bgImg)
            bgWidth = bgImg.offsetWidth;
        imgMaxWidth = colWidth - bgWidth > 0 ? colWidth - bgWidth : 4;
        for (var i = 0; i < lines.length; i++) {
            lines[i].style.maxWidth = imgMaxWidth + 'px'
        }
    }
    if (window.isMobile) {
        if (typeof jQuery !== 'undefined') {
            $(window).on('orientationchange', t_throttle(t1108_update))
        } else {
            window.addEventListener('orientationchange', t_throttle(t1108_update))
        }
    } else {
        window.addEventListener('resize', t_throttle(t1108_update))
    }
    if (typeof jQuery !== 'undefined') {
        $(container).on('displayChanged', t_throttle(t1108_update))
    } else {
        container.addEventListener('displayChanged', t_throttle(t1108_update))
    }
    t1108_update()
}
function t979_init(recid, rowheight, guttersizer) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var grid = rec.querySelector('.t979__grid');
    if (!grid)
        return;
    var items = rec.querySelectorAll('.t979__grid-item');
    var images = rec.querySelectorAll('.t979__image');
    var overlayList = rec.querySelectorAll('.t979__overlay');
    if (guttersizer === '')
        guttersizer = 0;
    t979_reverse(grid);
    t979_initMasonry(rec, recid, grid, rowheight, guttersizer, images);
    if (typeof jQuery !== 'undefined') {
        $(rec).find('.t979').bind('displayChanged', t_throttle(function() {
            var gutterSizer = parseInt(guttersizer, 10);
            var heightSizer = parseInt(rowheight, 10);
            var containerWidth = grid ? grid.offsetWidth : 0;
            var imageWidths = t979_getImageWidths(grid, heightSizer);
            var rows = t979_divideRows(imageWidths, containerWidth);
            var heights = [];
            t979_fitItemsByWidth(rows, heights, containerWidth, heightSizer, gutterSizer);
            t979_updateItems(grid, rows, heights, gutterSizer);
            t979_updateGridHeight(grid, heights, gutterSizer)
        }))
    } else {
        var currentBlock = rec.querySelector('.t979');
        currentBlock.addEventListener('displayChanged', t_throttle(function() {
            var gutterSizer = parseInt(guttersizer, 10);
            var heightSizer = parseInt(rowheight, 10);
            var containerWidth = grid ? grid.offsetWidth : 0;
            var imageWidths = t979_getImageWidths(grid, heightSizer);
            var rows = t979_divideRows(imageWidths, containerWidth);
            var heights = [];
            t979_fitItemsByWidth(rows, heights, containerWidth, heightSizer, gutterSizer);
            t979_updateItems(grid, rows, heights, gutterSizer);
            t979_updateGridHeight(grid, heights, gutterSizer)
        }))
    }
    window.addEventListener('resize', t_throttle(function() {
        var gutterSizer = parseInt(guttersizer, 10);
        var heightSizer = parseInt(rowheight, 10);
        var containerWidth = grid ? grid.offsetWidth : 0;
        var imageWidths = t979_getImageWidths(grid, heightSizer);
        var rows = t979_divideRows(imageWidths, containerWidth);
        var heights = [];
        t979_fitItemsByWidth(rows, heights, containerWidth, heightSizer, gutterSizer);
        t979_updateItems(grid, rows, heights, gutterSizer);
        t979_updateGridHeight(grid, heights, gutterSizer)
    }));
    t_onFuncLoad('imagesLoaded', function() {
        imagesLoaded(grid, function() {
            t979_initMasonry(rec, recid, grid, rowheight, guttersizer, images);
            Array.prototype.forEach.call(images, function(img) {
                img.style.display = 'block'
            })
        })
    })
}
function t979_reverse(grid) {
    if (grid && grid.classList.contains('t979__grid_reverse')) {
        for (var i = grid.childElementCount - 2; i >= 0; i--) {
            grid.appendChild(grid.children[i])
        }
    }
}
function t979_initMasonry(rec, recid, grid, rowheight, guttersizer, images) {
    var gutterSizer = parseInt(guttersizer, 10);
    var heightSizer = parseInt(rowheight, 10);
    Array.prototype.forEach.call(images, function(img) {
        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) && window.lazy === 'y') {
            t979__waitLazyLoadIMG(img, function() {
                t979_eventOnLoadImg(grid, heightSizer, gutterSizer)
            })
        } else {
            if (img.complete && img.naturalHeight && img.naturalWidth) {
                t979_eventOnLoadImg(grid, heightSizer, gutterSizer)
            } else {
                img.addEventListener('load', function() {
                    t979_eventOnLoadImg(grid, heightSizer, gutterSizer)
                })
            }
        }
    })
}
function t979__waitLazyLoadIMG(img, cb) {
    if (img.complete && img.naturalHeight && img.naturalWidth) {
        cb()
    } else {
        setTimeout(function() {
            t979__waitLazyLoadIMG(img, cb)
        }, 500)
    }
}
function t979_eventOnLoadImg(grid, heightSizer, gutterSizer) {
    var containerWidth = grid ? grid.offsetWidth : 0;
    var imageWidths = t979_getImageWidths(grid, heightSizer);
    var rows = t979_divideRows(imageWidths, containerWidth);
    var heights = [];
    t979_fitItemsByWidth(rows, heights, containerWidth, heightSizer, gutterSizer);
    t979_updateItems(grid, rows, heights, gutterSizer);
    t979_updateGridHeight(grid, heights, gutterSizer)
}
function t979_getImageWidths(grid, heightSizer) {
    var imageWidths = [];
    if (!grid)
        return !1;
    var images = grid.querySelectorAll('.t979__image');
    Array.prototype.forEach.call(images, function(img) {
        imageWidths.push(img.naturalWidth * heightSizer / img.naturalHeight)
    });
    return imageWidths
}
function t979_divideRows(imageWidths, containerWidth) {
    var rows = [];
    var curRow = 0;
    var rowWidth = 0;
    Array.prototype.forEach.call(imageWidths, function(item) {
        rowWidth += item;
        if (typeof rows[curRow] == 'undefined') {
            rows[curRow] = []
        }
        rows[curRow].push(item);
        if (rowWidth >= containerWidth) {
            curRow += 1;
            rowWidth = 0
        }
    });
    return rows
}
function t979_fitItemsByWidth(rows, heights, containerWidth, heightSizer, gutterSizer) {
    rows.forEach(function(row) {
        var sumWidth = 0;
        var thresholdRatio = 1.5;
        var rowWidth = containerWidth - gutterSizer * (row.length - 1);
        row.forEach(function(width) {
            sumWidth += width
        });
        var ratio = rowWidth / sumWidth;
        if (ratio < thresholdRatio) {
            row.forEach(function(width, curRow) {
                width *= ratio;
                row[curRow] = width
            });
            heights.push(heightSizer * ratio)
        } else {
            heights.push(heightSizer)
        }
        sumWidth = 0;
        row.forEach(function(width) {
            sumWidth += width
        })
    })
}
function t979_updateItems(grid, rows, heights, gutterSizer) {
    if (!grid)
        return !1;
    var curRow = 0;
    var curCol = 0;
    var top = 0;
    var left = 0;
    var width = 0;
    var height = 0;
    var items = grid.querySelectorAll('.t979__grid-item');
    Array.prototype.forEach.call(items, function(item) {
        if (curCol >= rows[curRow].length) {
            top += heights[curRow];
            curRow++;
            curCol = 0;
            if (curRow !== 0) {
                top += gutterSizer
            }
            left = 0
        }
        left += rows[curRow][curCol - 1] ? rows[curRow][curCol - 1] + gutterSizer : 0;
        width = rows[curRow][curCol];
        height = heights[curRow];
        item.style.top = top + 'px';
        item.style.left = left + 'px';
        item.style.width = width + 'px';
        item.style.height = height + 'px';
        curCol++
    })
}
function t979_updateGridHeight(grid, heights, gutterSizer) {
    var sumHeight = heights.reduce(function(cur, acc) {
        return cur + acc + gutterSizer
    }, 0);
    sumHeight -= gutterSizer;
    if (grid)
        grid.style.height = sumHeight + 'px'
}
