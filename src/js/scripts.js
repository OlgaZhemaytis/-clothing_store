$(function() {
	var Accordion = function(el, multiple) {
	  this.el = el || {};
	  // more then one submenu open?
	  this.multiple = multiple || false;
	  
	  var dropdownlink = this.el.find('.dropdownlink');
	  dropdownlink.on('click',
					  { el: this.el, multiple: this.multiple },
					  this.dropdown);
	};
	
	Accordion.prototype.dropdown = function(e) {
	  var $el = e.data.el,
		  $this = $(this),
		  //this is the ul.submenuItems
		  $next = $this.next();
	  
	  $next.slideToggle();
	  $this.parent().toggleClass('open');
	  
	  if(!e.data.multiple) {
		//show only one menu at the same time
		$el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
	  }
	};
	
	var accordion = new Accordion($('.accordion-menu'), false);
  });

  
var maxHeight = 400;

$(function(){

    $(".dropdown > li").hover(function() {
    
         var $container = $(this),
             $list = $container.find("ul"),
             $anchor = $container.find("a"),
             height = $list.height() * 1.1,       // make sure there is enough room at the bottom
             multiplier = height / maxHeight;     // needs to move faster if list is taller
        
        // need to save height here so it can revert on mouseout            
        $container.data("origHeight", $container.height());
        
        // so it can retain it's rollover color all the while the dropdown is open
        $anchor.addClass("hover");
        
        // make sure dropdown appears directly below parent list item    
        $list
            .show()
            .css({
                paddingTop: $container.data("origHeight")
            });
        
        // don't do any animation if list shorter than max
        if (multiplier > 1) {
            $container
                .css({
                    height: maxHeight,
                    overflow: "hidden"
                })
                .mousemove(function(e) {
                    var offset = $container.offset();
                    var relativeY = ((e.pageY - offset.top) * multiplier) - ($container.data("origHeight") * multiplier);
                    if (relativeY > $container.data("origHeight")) {
                        $list.css("top", -relativeY + $container.data("origHeight"));
                    };
                });
        }
        
    }, function() {
    
        var $el = $(this);
        
        // put things back to normal
        $el
            .height($(this).data("origHeight"))
            .find("ul")
            .css({ top: 0 })
            .hide()
            .end()
            .find("a")
            .removeClass("hover");
    
    });  
    
});

// // слайдер

// 'use strict';
//     var multiItemSlider = (function () {
//       return function (selector, config) {
//         var
//           _mainElement = document.querySelector(selector), // основный элемент блока
//           _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
//           _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
//           _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
//           _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
//           _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
//           _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
//           _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
//           _positionLeftItem = 0, // позиция левого активного элемента
//           _transform = 0, // значение транфсофрмации .slider_wrapper
//           _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
//           _items = []; // массив элементов
//         // наполнение массива _items
//         _sliderItems.forEach(function (item, index) {
//           _items.push({ item: item, position: index, transform: 0 });
//         });

//         var position = {
//           getMin: 0,
//           getMax: _items.length - 1,
//         }

//         var _transformItem = function (direction) {
//           if (direction === 'right') {
//             if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
//               return;
//             }
//             if (!_sliderControlLeft.classList.contains('slider__control_show')) {
//               _sliderControlLeft.classList.add('slider__control_show');
//             }
//             if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
//               _sliderControlRight.classList.remove('slider__control_show');
//             }
//             _positionLeftItem++;
//             _transform -= _step;
//           }
//           if (direction === 'left') {
//             if (_positionLeftItem <= position.getMin) {
//               return;
//             }
//             if (!_sliderControlRight.classList.contains('slider__control_show')) {
//               _sliderControlRight.classList.add('slider__control_show');
//             }
//             if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
//               _sliderControlLeft.classList.remove('slider__control_show');
//             }
//             _positionLeftItem--;
//             _transform += _step;
//           }
//           _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
//         }

//         // обработчик события click для кнопок "назад" и "вперед"
//         var _controlClick = function (e) {
//           if (e.target.classList.contains('slider__control')) {
//             e.preventDefault();
//             var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
//             _transformItem(direction);
//           }
//         };

//         var _setUpListeners = function () {
//           // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
//           _sliderControls.forEach(function (item) {
//             item.addEventListener('click', _controlClick);
//           });
//         }

//         // инициализация
//         _setUpListeners();

//         return {
//           right: function () { // метод right
//             _transformItem('right');
//           },
//           left: function () { // метод left
//             _transformItem('left');
//           }
//         }

//       }
//     }());

//     var slider = multiItemSlider('.slider');

