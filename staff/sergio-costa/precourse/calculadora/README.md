# Calculadora

## Introduccion

La calculadora hace unas operaciones en base a los dos numeros que pongas.

### *Operaciones :*

+ Sumar
```Javascript

function sum(num1, num2){
    var r = num1 + num2;
    return num1 + '+' + num2 + '=' + r;
}

```

+ Restar
```Javascript


function restar(num1, num2){
    var r = num1 - num2;
    return num1 + '-' + num2 + '=' + r;
}

```

+ Raiz
```Javascript

function raiz(num1){
    var r= Math.sqrt(num1);
    return +r.toFixed(3);
}

```

+ Multiplicar
```Javascript

function multiplicacion(num1, num2){
    var r = num1 * num2;
    return num1 + '*' + num2 + '=' + r;
}

```

+ Dividir

```Javascript

function division(num1, num2){
    var r = num1 / num2;
    if(isNaN(r)){
        r="indefinido";
       return num1 + "/" + num2 + "=" + r;
    }else{
        return num1 + '/' + num2 + '=' + +r.toFixed(3);
    }
}

```