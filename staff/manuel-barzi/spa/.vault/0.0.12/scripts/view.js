'use strict';

//#region panel

class Panel {
    constructor($element) {
        this.$element = $element;
    }

    hide() {
        this.$element.hide();
    }

    show() {
        this.$element.show();
    }
}

//#endregion

//#region login panel

class LoginPanel extends Panel {
    constructor() {
        super($(`<section class="login container">
    <h2>Login</h2>
    <form class="login__form" >
        <div class="row">
            <div class="col text-center">
                <label for="email">E-mail:</label>
                <input type="email" name="email" placeholder="email" required>
            </div>
            <div class="col">
                <label for="password">Password:</label>
                <input type="password" name="password" placeholder="password" required>
            </div>
            <div class="col">
                <button type="submit">Login</button>
            </div>
            </div>
    </form>
</section>`));

        var $container = this.$element;

        var $form = $container.find('form');
        this.__$form__ = $form;

        this.__$emailInput__ = $form.find('input[type=email]');

        this.__$passwordInput__ = $form.find('input[type=password]');

        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;

        var $registerLink = $('<a href="#" class="login__register-link">Register</a>');
        $container.append($registerLink);
        this.__$registerLink__ = $registerLink;
    }

    set onLogin(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();

            callback(email, password);
        });
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    clear() {
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }

    set onGoToRegister(callback) {
        this.__$registerLink__.on('click', callback);
    }
}

//#endregion

//#region register panel

class RegisterPanel extends Panel {
    constructor() {
        super($(`<section class="register">
    <h2>Register</h2>
    <form class="register__form">
        <label for="name">Name:</label>
        <input type="text" name="name" placeholder="name" required>
        <label for="surname">Surname:</label>
        <input type="text" name="surname" placeholder="surname" required>
        <label for="email">E-mail:</label>
        <input type="email" name="email" placeholder="email" required>
        <label for="password">Password:</label>
        <input type="password" name="password" placeholder="password" required>
        <label for="password">Confirm Password:</label>
        <input type="password" name="password-confirmation" placeholder="password" required>
        <button type="submit">Register</button>
    </form>
</section>`));

        var $container = this.$element;

        this.__$form__ = $container.find('form');
        var $form = this.__$form__;

        this.__$nameInput__ = $form.find('input[name=name]');

        this.__$surnameInput__ = $form.find('input[name=surname]');

        this.__$emailInput__ = $form.find('input[type=email]');

        this.__$passwordInput__ = $form.find('input[name=password]');

        this.__$passwordConfirmationInput__ = $form.find('input[name=password-confirmation]');

        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;

        var $loginLink = $('<a href="#" class="register__login-link">Login</a>');
        $container.append($loginLink)
        this.__$loginLink__ = $loginLink;
    }

    set onRegister(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();

            callback(name, surname, email, password, passwordConfirmation);
        });
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    clear() {
        this.__$nameInput__.val('');
        this.__$surnameInput__.val('');
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__$passwordConfirmationInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }

    set onGoToLogin(callback) {
        this.__$loginLink__.on('click', callback);
    }
}

//#endregion

//#region home panel

class HomePanel extends Panel {
    constructor() {
        super($(`<section class="home">
    <h2>Welcome, <span class="home__name"></span>!</h2>
    <button class="home__logout">Logout</button>
</section>`));

        var $container = this.$element;

        var $title = $container.find('h2');

        var $userSpan = $title.find('span');
        this.__$userSpan__ = $userSpan;

        this.__$logoutButton__ = $container.find('button');
    }

    set user(user) {
        this.__$userSpan__.text(user.name);
    }

    set onLogout(callback) {
        this.__$logoutButton__.on('click', callback);
    }
}

//#endregion

//#region search panel

class SearchPanel extends Panel {
    constructor() {
        super($(`<section>
    <form>
        <input type="text" placeholder="..." name ="query">
        <button type="submit">Search</button>
    </form>
</section>`));

        var $container = this.$element;

        var $form = $container.find('form');
        this.__$form__ = $form;

        var $queryInput = $form.find('input');
        this.__$queryInput__ = $queryInput;

        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;

        var $resultList = $('<ul></ul>');
        $container.append($resultList);
        this.__$resultList__ = $resultList;
    }

    set onSearch(callback) {
        this.__$form__.on('submit', event => {

            event.preventDefault();

            var query = this.__$queryInput__.val();

            callback(query);
        });
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    set results(results) {
        this.__$resultList__.html('');
        this.__errorPanel__.hide();

        results.forEach(result => {
            var $item = $('<li>' + result.text + ' <img src="' + result.image + '" width="100px"></li>');
            this.__$resultList__.append($item);

        });
    }

    clear() {
        this.clearResults();
        this.__$queryInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }

    clearResults() {
        this.__$resultList__.html('');
    }
}

//#endregion

//#region error panel

class ErrorPanel extends Panel {
    constructor() {
        super($('<section class="error"></section>'));
    }

    set message(message) {
        this.$element.text(message);
    }
}


//#endregion 