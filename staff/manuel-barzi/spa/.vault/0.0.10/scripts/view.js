'use strict';

//#region panel

function Panel($element) {
    this.$element = $element;
}

Panel.prototype.hide = function () {
    this.$element.hide();
};

Panel.prototype.show = function () {
    this.$element.show();
};

//#endregion

//#region login panel

function LoginPanel() {
    Panel.call(this, $('<section class="login">'
        + '<h2>Login</h2>'
        + '<form class="login__form" >'
        + '<label for="email">E-mail:</label>'
        + '<input type="email" name="email" placeholder="email" required>'
        + '<label for="password">Password:</label>'
        + '<input type="password" name="password" placeholder="password" required>'
        + '<button type="submit">Login</button>'
        + '</form>'
        + '</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    this.__$emailInput__ = $form.children('input[type=email]');

    this.__$passwordInput__ = $form.children('input[type=password]');

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="login__register-link">Register</a>');
    $container.append($registerLink);
    this.__$registerLink__ = $registerLink;
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, 'onLogin', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {
            event.preventDefault();

            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();

            callback(email, password);
        }.bind(this));
    }
});

Object.defineProperty(LoginPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

LoginPanel.prototype.clear = function () {
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

Object.defineProperty(LoginPanel.prototype, 'onGoToRegister', {
    set: function (callback) {
        this.__$registerLink__.on('click', callback);
    }
});

//#endregion

//#region register panel

function RegisterPanel() {
    Panel.call(this, $('<section class="register">'
        + '<h2>Register</h2>'
        + '<form class="register__form">'
        + '<label for="name">Name:</label>'
        + '<input type="text" name="name" placeholder="name" required>'
        + '<label for="surname">Surname:</label>'
        + '<input type="text" name="surname" placeholder="surname" required>'
        + '<label for="email">E-mail:</label>'
        + '<input type="email" name="email" placeholder="email" required>'
        + '<label for="password">Password:</label>'
        + '<input type="password" name="password" placeholder="password" required>'
        + '<label for="password">Confirm Password:</label>'
        + '<input type="password" name="password-confirmation" placeholder="password" required>'
        + '<button type="submit">Register</button>'
        + '</form>'
        + '</section>'));

    var $container = this.$element;

    this.__$form__ = $container.children('form');
    var $form = this.__$form__;

    this.__$nameInput__ = $form.children('input[name=name]');

    this.__$surnameInput__ = $form.children('input[name=surname]');

    this.__$emailInput__ = $form.children('input[type=email]');

    this.__$passwordInput__ = $form.children('input[name=password]');

    this.__$passwordConfirmationInput__ = $form.children('input[name=password-confirmation]');

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $loginLink = $('<a href="#" class="register__login-link">Login</a>');
    $container.append($loginLink)
    this.__$loginLink__ = $loginLink;
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, 'onRegister', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {
            event.preventDefault();

            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();

            callback(name, surname, email, password, passwordConfirmation);
        }.bind(this));
    }
});

Object.defineProperty(RegisterPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

RegisterPanel.prototype.clear = function () {
    this.__$nameInput__.val('');
    this.__$surnameInput__.val('');
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__$passwordConfirmationInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

Object.defineProperty(RegisterPanel.prototype, 'onGoToLogin', {
    set: function (callback) {
        this.__$loginLink__.on('click', callback);
    }
});

//#endregion

//#region home panel

function HomePanel() {
    Panel.call(this, $('<section class="home">'
        + '<h2>Welcome, <span class="home__name"></span>!</h2>'
        + '<button class="home__logout">Logout</button>'
        + '</section>'));

    var $container = this.$element;

    var $title = $container.children('h2');

    var $userSpan = $title.children('span');
    this.__$userSpan__ = $userSpan;

    this.__$logoutButton__ = $container.children('button');
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

Object.defineProperty(HomePanel.prototype, 'user', {
    set: function (user) {
        this.__$userSpan__.text(user.name);
    }
});

Object.defineProperty(HomePanel.prototype, 'onLogout', {
    set: function (callback) {
        this.__$logoutButton__.on('click', callback);
    }
});

//#endregion

//#region search panel

function SearchPanel() {
    Panel.call(this, $('<section>'
        + '<form>'
        + '<input type="text" placeholder="..." name ="query">'
        + '<button type="submit">Search</button>'
        + '</form>'
        + '</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $queryInput = $form.children('input');
    this.__$queryInput__ = $queryInput;

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $resultList = $('<ul></ul>');
    $container.append($resultList);
    this.__$resultList__ = $resultList;
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;

Object.defineProperty(SearchPanel.prototype, 'onSearch', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {

            event.preventDefault();

            var query = this.__$queryInput__.val();

            callback(query);
        }.bind(this));
    }
});

Object.defineProperty(SearchPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

Object.defineProperty(SearchPanel.prototype, 'results', {
    set: function (results) {
        this.__$resultList__.html('');
        this.__errorPanel__.hide();

        results.forEach(function (result) {
            var $item = $('<li>' + result.text + ' <img src="' + result.image + '" width="100px"></li>');
            this.__$resultList__.append($item);

        }.bind(this));
    }
});

SearchPanel.prototype.clear = function () {
    this.clearResults();
    this.__$queryInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

SearchPanel.prototype.clearResults = function () {
    this.__$resultList__.html('');
};

//#endregion

//#region error panel

function ErrorPanel() {
    Panel.call(this, $('<section class="error"></section>'));
}

ErrorPanel.prototype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

Object.defineProperty(ErrorPanel.prototype, 'message', {
    set: function (message) {
        this.$element.text(message);
    }
});

//#endregion 