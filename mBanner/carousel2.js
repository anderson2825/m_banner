(function () {
    function Carousel(el, autoplay) {
        if (!(this instanceof Carousel)) return new Carousel(container, params);
        this._init_(el, autoplay);
    }
    Carousel.prototype = {
        constructor: Carousel,
        _init_: function (el, autoplay) {
            this.el = el;
            this.autoplay = autoplay;
            this.Slide();
        }
    }
    Carousel.prototype.Slide = function () {
        var self = this;
        var banner = document.querySelector(self.el),
            slide = banner.querySelector(".slide"),
            startPointX = 0,
            startLeft = 0,
            movePointX = 0,
            startPointY = 0,
            endPointX = 0,
            endPointY = 0,
            cn = 0,
            timer = null,
            imgWidth = banner.offsetWidth;
            banner.insertAdjacentHTML('beforeend', '<div class="pagination"><span class="pagination_current">1</span> / <span class="pagination_total">0</span> </div>');
            var pagination = banner.querySelector(".pagination"),
                paginationCurrent = pagination.children[0],
                paginationTotal = pagination.children[1];
        //init
        slide.innerHTML += slide.innerHTML;
        var len = slide.children.length;
        paginationTotal ? paginationTotal.innerText = len / 2 : paginationTotal
        slide.style.width = len * banner.offsetWidth + "px";
        slide.style.transform = "translate3d(0,0,0)";
        if(len<=2){
            pagination.remove();
            return false;
        }
        banner.addEventListener("touchstart", function (ev) {
            clearInterval(timer);
            slide.style.transition = null;
            if (cn == 0) {
                cn = len / 2;
            }
            if (cn == len - 1) {
                cn = len / 2 - 1;
            }
            slide.style.transform = "translate3d(" + -cn * imgWidth + "px,0,0)";
            startPointX = ev.changedTouches[0].pageX;
            startPointY = ev.changedTouches[0].pageY;
            startLeft = parseFloat(slide.style.transform.split("(")[1]);
        });
        banner.addEventListener("touchmove", function (ev) {
            movePointX = ev.changedTouches[0].pageX - startPointX;
            endPointX =  ev.changedTouches[0].pageX;
            endPointY =  ev.changedTouches[0].pageY;
            if(Math.abs(startPointX - endPointX ) > Math.abs(startPointY - endPointY )){
                ev.preventDefault();
            }
            slide.style.transform = "translate3d(" + (movePointX + startLeft) + "px,0,0)";
        });
        banner.addEventListener("touchend", function (ev) {
            movePointX = ev.changedTouches[0].pageX - startPointX;
            var backWidth = banner.offsetWidth/2;
            console.log(movePointX,banner.offsetWidth,backWidth,imgWidth);
            if (Math.abs(movePointX) > backWidth) {
                cn -= movePointX / Math.abs(movePointX);
            }
            slide.style.transition = ".3s";
            slide.style.transform = "translate3d(" + -cn * imgWidth + "px,0,0)";
            var hn = cn % (len / 2);
            paginationCurrent.innerText = hn + 1;
            self.autoplay ? timer = setInterval(move, 4000) : self.autoplay;
        });
        function move() {
            cn++;
            if (cn >= len - 1) {
                cn = len - 1;
            }
            slide.style.transition = '.3s';
            slide.style.transform = "translate3d(" + -cn * imgWidth + "px,0,0)";
            setTimeout(function () {
                if (cn == len - 1) {
                    cn = len / 2 - 1;
                    slide.style.transition = "none";
                } else {
                    slide.style.transition = ".3s";
                }
                slide.style.transform = "translate3d(" + -cn * imgWidth + "px,0,0)";

            },100)
            var hn = cn % (len / 2);
            paginationCurrent.innerText = hn + 1;
        }
        self.autoplay ? timer = setInterval(move, 4000) : self.autoplay;
    }
    window.Carousel = Carousel;
}());
