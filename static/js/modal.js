var Modal = function (content, settings) {
    settings = settings || {};
    this.modalContentSelector = content;
    this.settings = {
        modalAnimationTime: settings.modalAnimationTime || 200,
        isFullScreen: settings.isFullScreen || false,
        onOpen: settings.onOpen || false,
        onClose: settings.onClose || false
    };
    this.overlaySelector = '#modal-overlay';
    this.modalSelector = '#modal';
    this.closeSelector = '[data-modal-close]';
    this.init();
};

Modal.prototype = {
    init: function () {
        this.modalContentElement = document.querySelector(this.modalContentSelector);
        if (!this.modalContentElement) {
            console.log('Modal content with selector: "' + this.modalContentSelector + '" was not found.');
        }
        this.modalContentParentElement = this.modalContentElement.parentNode;
        this.modalElement = document.querySelector(this.modalSelector);
        this.overlayElement = document.querySelector(this.overlaySelector);
        this.closeElement = this.modalContentElement.querySelector(this.closeSelector);

        if (this.closeElement) {
            this.closeElement.addEventListener('click', function (event) {
                event.preventDefault();
                this.close();
            }.bind(this));
        }

        this.modalContentElement.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        document.addEventListener('keyup', function (event) {
            this.keyListener(event);
        }.bind(this));
    },
    open: function () {
        this.modalElement.appendChild(this.modalContentElement);
        this.modalContentElement.style.display = 'block';
        //this.overlayElement.classList.add('active');
        $(this.overlayElement).addClass('active');
        this.modalElement.style.display = 'block';
        this.toMiddle(this.modalElement);
        setTimeout(function () {
            //this.modalElement.classList.add('active');
            $(this.modalElement).addClass('active');
            setTimeout(function () {
                if (this.settings.onOpen) this.settings.onOpen();
            }.bind(this), this.settings.modalAnimationTime);
        }.bind(this), 20);
        this.closeCached = this.close.bind(this); // to removeEventListener with .bind
        this.overlayElement.addEventListener('click', this.closeCached);
    },
    toMiddle: function (element) {
        if (this.settings.isFullScreen) {
            //this.modalElement.classList.add('is-fullscreen');
            $(this.modalElement).addClass('is-fullscreen');
            return;
        } else {
            //this.modalElement.classList.remove('is-fullscreen');
            $(this.modalElement).removeClass('is-fullscreen');
        }
        element.style.marginLeft = parseInt(element.offsetWidth / -2) + 'px';
        element.style.marginTop = parseInt(element.offsetHeight / -2) + 'px';
    },
    close: function () {
        if (this.settings.onClose) this.settings.onClose();
        //this.modalElement.classList.remove('active');
        $(this.modalElement).removeClass('active');
        //this.overlayElement.classList.remove('active');
        $(this.overlayElement).removeClass('active');
        setTimeout(function () {
            this.modalContentElement.removeAttribute('style');
            this.modalElement.removeAttribute('style');
            this.modalElement.style.display = 'none';
            this.modalContentParentElement.appendChild(this.modalContentElement);
        }.bind(this), this.settings.modalAnimationTime);
        this.overlayElement.removeEventListener('click', this.closeCached);
    },
    keyListener: function (event) {
        switch (event.keyCode) {
            case 27:
                this.close();
                break;
        }
    }
};