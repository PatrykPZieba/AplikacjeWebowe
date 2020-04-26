var FieldType;
(function (FieldType) {
    FieldType["Input"] = "input";
    FieldType["TextArea"] = "textarea";
    FieldType["SelectBox"] = "select";
    FieldType["CheckBox"] = "checkbox";
    FieldType["Email"] = "email";
})(FieldType || (FieldType = {}));
var InputField = /** @class */ (function () {
    function InputField(name, label, type) {
        this.element =
            document.createElement(type);
        this.name = name;
        this.label = label;
        this.element.name = this.name;
    }
    InputField.prototype.render = function () {
        return this.element;
    };
    InputField.prototype.getValue = function () {
        return this.element.value;
    };
    return InputField;
}());
var textAreaField = /** @class */ (function () {
    function textAreaField(name, label, type) {
        this.element = document.createElement(type);
        this.name = name;
        this.label = label;
        this.element.name = this.name;
    }
    textAreaField.prototype.render = function () {
        return this.element;
    };
    textAreaField.prototype.getValue = function () {
        return this.element.value;
    };
    return textAreaField;
}());
var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label) {
        this.element = document.createElement(FieldType.Input);
        this.element.setAttribute('type', FieldType.CheckBox);
        this.name = name;
        this.label = label;
        this.element.name = this.name;
    }
    CheckboxField.prototype.render = function () {
        return this.element;
    };
    CheckboxField.prototype.getValue = function () {
        return this.element.checked == true ? 'I like the idea' : 'Im against e-learning';
    };
    return CheckboxField;
}());
var SelectInputText = /** @class */ (function () {
    function SelectInputText(name, label, selectOption) {
        this.element = document.createElement(FieldType.SelectBox);
        for (var i = 0; i < selectOption.length; i++) {
            var option = document.createElement('option');
            option.text = selectOption[i];
            this.element.appendChild(option);
        }
        this.name = name;
        this.label = label;
        this.element.name = this.name;
    }
    SelectInputText.prototype.render = function () {
        return this.element;
    };
    SelectInputText.prototype.getValue = function () {
        return this.element.value;
    };
    return SelectInputText;
}());
var EmailField = /** @class */ (function () {
    function EmailField(name, label) {
        this.element = document.createElement(FieldType.Input);
        this.element.setAttribute('type', FieldType.Email);
        this.name = name;
        this.label = label;
        this.element.name = this.name;
    }
    EmailField.prototype.render = function () {
        return this.element;
    };
    EmailField.prototype.getValue = function () {
        return this.element.value;
    };
    return EmailField;
}());
var Form = /** @class */ (function () {
    function Form(id) {
        this.fields = new Array();
        this.formElement = document.getElementById(id);
        this.fields.push(new InputField('Surname', 'Surname', FieldType.Input));
        this.fields.push(new InputField('Name', 'Name', FieldType.Input));
        this.fields.push(new EmailField('Email', 'Email'));
        this.fields.push(new SelectInputText('choose field of study', 'choose field of study', ['Programist', 'Teacher', 'Doctor']));
        this.fields.push(new SelectInputText('Choose Specialization', 'Choose Specialization', ['Web-Developer', 'Mobile-Apps-Developer', 'Math-Teacher', 'Physics-Teacher', 'General-Practitioner', 'Ophthalmolgist']));
        this.fields.push(new CheckboxField('Do you like the idea of e-learning ?', 'Do you like the idea of e-learning ?'));
        this.fields.push(new textAreaField('Additional-Comments', 'Additional-Comments', FieldType.TextArea));
    }
    Form.prototype.render = function () {
        for (var i = 0; i < this.fields.length; i++) {
            document.body.append(this.fields[i].label);
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(this.fields[i].render());
            document.body.appendChild(document.createElement('br'));
        }
    };
    Form.prototype.getValue = function () {
        for (var i = 0; i < this.fields.length; i++) {
            document.body.append(this.fields[i].label + ': ' + this.fields[i].getValue());
            document.body.appendChild(document.createElement('br'));
        }
        document.body.appendChild(document.createElement('br'));
    };
    return Form;
}());
var form = new Form('2');
window.addEventListener('load', function () {
    form.render();
});
document.getElementById("PrintResult").addEventListener("click", function () { return form.getValue(); });
