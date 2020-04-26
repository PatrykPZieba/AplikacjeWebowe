enum FieldType {
    Input = 'input',
    TextArea = 'textarea',
    SelectBox = 'select',
    CheckBox = 'checkbox',
    Email ='email',
}

interface Field {
    name: string;
    label: string;
    type: FieldType;
    render(): HTMLElement;
    getValue(): any;
}
 
class InputField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string , type:FieldType) {
    this.element =
   <HTMLInputElement>document.createElement(<string>type);
    this.name = name;
    this.label = label;
    this.element.name = this.name;
    }
    render(): HTMLElement {
    return this.element;
    }
    getValue(): any {
    return this.element.value
    }
}

class textAreaField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLTextAreaElement;
    constructor(name: string, label: string, type: FieldType) {
        this.element =<HTMLTextAreaElement>document.createElement(<string>type);
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        }
        render(): HTMLElement {
        return this.element;
        }
        getValue(): any {
        return this.element.value
        }
}

class CheckboxField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =<HTMLInputElement>document.createElement(FieldType.Input);
        this.element.setAttribute('type',FieldType.CheckBox);
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        }
        render(): HTMLElement {
        return this.element;
        }
        getValue(): any {
        return this.element.checked==true?'I like the idea':'Im against e-learning';
        }
}

class SelectInputText implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLSelectElement;
    constructor(name: string, label: string, selectOption: Array<string>) {
        this.element =document.createElement(FieldType.SelectBox);
        for(let i=0;i<selectOption.length;i++){
            let option =document.createElement('option')
            option.text = selectOption[i]
            this.element.appendChild(option);          
        }
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        }
        render(): HTMLElement {
        return this.element;
        }
        getValue(): any {
        return this.element.value
        }
}

class EmailField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =<HTMLInputElement>document.createElement(FieldType.Input);
        this.element.setAttribute('type',FieldType.Email);
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        }
        render(): HTMLElement {
        return this.element;
        }
        getValue(): any {
        return this.element.value
        }
}
   class Form {
    fields: Field[];
    formElement: HTMLElement;
    constructor(id: string) {
    this.fields = new Array();
    this.formElement = document.getElementById(id);
    this.fields.push(new InputField('Surname','Surname',FieldType.Input))
    this.fields.push(new InputField('Name','Name',FieldType.Input))
    this.fields.push(new EmailField('Email','Email'))
    this.fields.push(new SelectInputText('choose field of study','choose field of study',['Programist','Teacher','Doctor']))
    this.fields.push(new SelectInputText('Choose Specialization','Choose Specialization',['Web-Developer','Mobile-Apps-Developer','Math-Teacher','Physics-Teacher','General-Practitioner','Ophthalmolgist']))
    this.fields.push(new CheckboxField('Do you like the idea of e-learning ?','Do you like the idea of e-learning ?'))
    this.fields.push(new textAreaField('Additional-Comments','Additional-Comments',FieldType.TextArea))
    }
    render(): void {
        for(let i=0;i<this.fields.length;i++){
            document.body.append(this.fields[i].label)
            document.body.appendChild(document.createElement('br'))
            document.body.appendChild(this.fields[i].render())
            document.body.appendChild(document.createElement('br'))                  
        }      
    }
    getValue(): void {
        for(let i=0;i<this.fields.length;i++){
            document.body.append(this.fields[i].label+': '+this.fields[i].getValue())
            document.body.appendChild(document.createElement('br'))                
        }
        document.body.appendChild(document.createElement('br'))
    }
   }
   let form = new Form('2')
window.addEventListener('load', () => {
    form.render();
})
document.getElementById("PrintResult").addEventListener("click",() => form.getValue())