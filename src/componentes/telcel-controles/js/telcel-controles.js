/*
  Autor: Contento
  Versión: 0.0.1
  Dependencias: JQuery
*/


var TelcelControles = (function() {

  var breakpoint = 768;

  /* Telcel Select multiple */
  function telcelControlesSelectCheckbox() {

    var selects = document.querySelectorAll('.telcel-controles--select-checkbox--boton');
    for (var i = 0; i < selects.length; i++) {
      var item = selects[i];

      item.addEventListener('click', function(e) {
        e.preventDefault();

        var padre = this.parentNode;
        var anchoVentana = Telcel.ancho_ventana();

        //Dropdown formularios
        if (padre.classList.contains('open')) {
          telcelControlesSelectCheckboxFiltrosSeleccionados();
          padre.classList.remove('open');
        } else {
          telcelControlesSelectCheckboxFiltrosSeleccionados();
          var selectContenedores = document.getElementsByClassName("telcel-controles--select-checkbox--contenedor");
          for (var i = 0; i < selectContenedores.length; i++) {
            selectContenedores[i].classList.remove("open");
          }
          padre.classList.add('open');
          if (Telcel.ancho_ventana() < breakpoint) {
            padre.querySelector('.telcel-controles-contenedor--select-checkbox-filtro').style.width = anchoVentana + 'px';
          } else {
            padre.querySelector('.telcel-controles-contenedor--select-checkbox-filtro').style.width = '100%';
          }
        }

      });
    }
  }

  function selectCheckboxListaTodos(seleccionado, estado) {
    var listaCheckbox = Telcel.masCercano(seleccionado, '.telcel-controles-contenedor--select-checkbox--contenedor')
      .querySelectorAll('ul li');

    for (var i = 0; i < listaCheckbox.length; i++) {

      var li = listaCheckbox[i];

      if (estado === "seleccionar") {
        li.classList.add('telcel-controles-contenedor--select-checkbox---activo');
        li.querySelector('input').checked = true;
      } else {
        li.classList.remove('telcel-controles-contenedor--select-checkbox---activo');
        li.querySelector('input').checked = false;
      }

    }
  }

  function telcelControlesSelectCheckboxLista() {
    var checkboxes = document.querySelectorAll('.telcel-controles-contenedor--select-checkbox--contenedor ul li input');
    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];
      checkbox.addEventListener('click', function(e) {

        var lista = Telcel.masCercano(this, 'li');
        var seleccionarTodos = Telcel.masCercano(this, 'ul').querySelector('.telcel-controles-contenedor--select-checkbox---seleccionar-todos');

        //Si el checkbox esta checkeado comprueba si es "Todos" de lo contrario solo lo marca como activo
        if (this.checked == true) {
          lista.classList.add('telcel-controles-contenedor--select-checkbox---activo');
          if (this.classList.contains('telcel-controles-contenedor--select-checkbox---seleccionar-todos')) {
            selectCheckboxListaTodos(this, 'seleccionar');
          }
        } else {
          //Cualquier seleccion le quita el checked a "Todos"
          seleccionarTodos.checked = false;
          Telcel.masCercano(seleccionarTodos, 'li').classList.remove('telcel-controles-contenedor--select-checkbox---activo');

          lista.classList.remove('telcel-controles-contenedor--select-checkbox---activo');
          if (this.classList.contains('telcel-controles-contenedor--select-checkbox---seleccionar-todos')) selectCheckboxListaTodos(this, 'deseleccionar');

        }

      });
    }
  }

  function telcelControlesSelectCheckboxFiltrosSeleccionados() {
    var selectAbierto = document.querySelector('.telcel-controles--select-checkbox--contenedor.open');
    if (selectAbierto != null) {
      if (selectAbierto.querySelector('.telcel-controles-contenedor--select-checkbox---seleccionar-todos').checked == true) {
        selectAbierto.querySelector('.telcel-controles--select-checkbox--boton-label').innerHTML = 'Todos';
      } else {
        var checkboxSeleccionados = selectAbierto.querySelectorAll("input:checked");
        var filtrosSeleccionandos = '';
        var separadores = ', ';
        for (var i = 0; i < checkboxSeleccionados.length; i++) {
          if (i == checkboxSeleccionados.length - 1) separadores = '';
          filtrosSeleccionandos += checkboxSeleccionados[i].value + separadores;
        }
        if (filtrosSeleccionandos == '') filtrosSeleccionandos = 'Todos';
        (filtrosSeleccionandos.length > 19) ? separadores = '...': separadores = '';
        selectAbierto.querySelector('.telcel-controles--select-checkbox--boton-label').innerHTML = filtrosSeleccionandos.substr(0, 20) + separadores;
      }
    }
  }

  function telcelControlesSelectCheckboxConfirmar() {
    var cta = document.querySelectorAll('.telcel-controles-contenedor--select-checkbox--cta');
    for (var i = 0; i < cta.length; i++) {
      var boton = cta[i];
      boton.addEventListener('click', function(e) {
        e.preventDefault();
        telcelControlesSelectCheckboxFiltrosSeleccionados();
        document.querySelector('.telcel-controles--select-checkbox--contenedor.open').classList.remove('open');
      });
    }
  }
  /* Telcel Select multiple */



  //Se utiliza jQuery por resultados mas consistentes con el attr.
  function telcelControlesMostrarContrasena() {
    var contrasenas = document.querySelectorAll('.telcel-campo-de-texto-contrasena');

    for (var i = 0; i < contrasenas.length; i++) {

      contrasenas[i].addEventListener('click', function(e) {
        e.preventDefault();

        var contrasena = $(this.previousSibling.previousSibling);
        var icono = this.querySelector('img');

        if (contrasena.attr('type') === "text") {
          contrasena.attr('type', 'password');
          icono.src = 'img/visualizar.svg';
        } else {
          contrasena.attr('type', 'text');
          icono.src = 'img/no-visualizar.svg';
        }

      });

    }

  }


  function telcelControlesSoloLetras() {

    var camposLetras = document.querySelectorAll('.telcel-solo-letras');

    for (var i = 0; i < camposLetras.length; i++) {
      camposLetras[i].addEventListener('keyup', function(e) {
        var valor = this.value;
        var re = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/;
        if (!re.test(valor)) {
          $(this).val(valor.replace(/\d+/g, ''));
        }
      });
    }

  }


  function telcelControlesSoloNumeros() {

    var camposNumeros = document.querySelectorAll('.telcel-solo-numeros');

    for (var i = 0; i < camposNumeros.length; i++) {
      camposNumeros[i].addEventListener('keyup', function(e) {
        var valor = this.value;
        var re = /^\d+$/;
        if (!re.test(valor)) {
          $(this).val(valor.substring(0, valor.length - 1));
        }
      });
    }
  }


  function telcelControlesListenerTarjetaCredito() {
    var tarjetasContenedor = document.querySelectorAll('.telcel-controles-tarjeta-de-credito');

    for (var i = 0; i < tarjetasContenedor.length; i++) {

      var contenedor = tarjetasContenedor[i];

      var contenedorTarjeta = contenedor.querySelector('.telcel-controles-tarjeta-de-credito--numero');
      var contenedorFecha = contenedor.querySelector('.telcel-controles-tarjeta-de-credito--fecha');
      var contenedorCvv = contenedor.querySelector('.telcel-controles-tarjeta-de-credito--cvv');

      var numeroTarjeta = contenedor.querySelector('.telcel-controles-tarjeta-de-credito--numero-input');
      var fecha = contenedor.querySelector('.telcel-controles-tarjeta-de-credito--fecha-input');
      var cvv = contenedor.querySelector('.telcel-controles-tarjeta-de-credito--cvv-input');

      var imagen = contenedor.querySelector('.telcel-controles-tarjeta-de-credito--imagen-img');

      var etiqueta = contenedor.querySelector('label');

      var tarjetaTemporal;

      var numeroCaracteres

      numeroTarjeta.addEventListener('keyup', function(e) {

        var tecla = event.keyCode || event.charCode;

        //Si es la tecla de borrar, adelante eo atras no la considera
        if (tecla != 8 && tecla != 39 && tecla != 37) {
          var valorNumero = numeroTarjeta.value,
            valorFecha = fecha.value,
            varlorCvv = cvv.value;

          numeroCaracteres = valorNumero.length,
            fechaCaracteres = valorFecha.length,
            cvvCaracteres = varlorCvv.length;

          if (numeroCaracteres >= 4) {
            if (valorNumero === "1111") imagen.src = '../telcel-controles/img/amex.svg';
            else imagen.src = '../telcel-controles/img/mastercard.svg';
          } else imagen.src = '../telcel-controles/img/tarjeta.svg';

          if (numeroCaracteres === 19) {
            contenedorFecha.classList.remove('telcel-controles-tarjeta-de-credito--fecha-inactivo');
            fecha.focus();
          } else {
            contenedorFecha.classList.add('telcel-controles-tarjeta-de-credito--fecha-inactivo');
            contenedorCvv.classList.add('telcel-controles-tarjeta-de-credito--cvv-inactivo');
          }

          if (numeroCaracteres < 19) numeroTarjeta.value = numeroTarjeta.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');

        }

      });

      numeroTarjeta.addEventListener('focus', function() {
        etiqueta.innerHTML = "* Datos de tarjeta - Número de tarjeta";

        contenedorTarjeta.classList.remove('telcel-controles-tarjeta-de-credito--numero-inactivo');
        contenedorFecha.classList.add('telcel-controles-tarjeta-de-credito--fecha-inactivo');
        contenedorCvv.classList.add('telcel-controles-tarjeta-de-credito--cvv-inactivo');

      });

      numeroTarjeta.addEventListener('blur', function() {
        etiqueta.innerHTML = "* Datos de tarjeta";

        if (numeroCaracteres === 19) {
          contenedorTarjeta.classList.remove('telcel-controles-tarjeta-de-credito--numero-inactivo');
          contenedorFecha.classList.remove('telcel-controles-tarjeta-de-credito--fecha-inactivo');
          contenedorCvv.classList.remove('telcel-controles-tarjeta-de-credito--cvv-inactivo');
        }

      });


      fecha.addEventListener('keyup', function() {
        var valorNumero = numeroTarjeta.value,
          valorFecha = fecha.value,
          varlorCvv = cvv.value;

        var numeroCaracteres = valorNumero.length,
          fechaCaracteres = valorFecha.length,
          cvvCaracteres = varlorCvv.length;

        if (fechaCaracteres < 4) fecha.value = fecha.value.replace(/^(\d{2})/, '$1/');

        if (fechaCaracteres === 5) {

          var tecla = event.keyCode || event.charCode;

          //Si es la tecla de borrar, adelante eo atras no la considera
          if (tecla != 8 && tecla != 39 && tecla != 37) {
            contenedorCvv.classList.remove('telcel-controles-tarjeta-de-credito--cvv-inactivo');
            cvv.focus();
          }

        }

      });

      fecha.addEventListener('focus', function() {
        etiqueta.innerHTML = "* Datos de tarjeta - Fecha de caducidad";

        contenedorTarjeta.classList.add('telcel-controles-tarjeta-de-credito--numero-inactivo');
        contenedorFecha.classList.remove('telcel-controles-tarjeta-de-credito--fecha-inactivo');
        contenedorCvv.classList.remove('telcel-controles-tarjeta-de-credito--cvv-inactivo');
      });

      fecha.addEventListener('blur', function() {
        etiqueta.innerHTML = "* Datos de tarjeta";
      });


      cvv.addEventListener('keyup', function() {

      });

      cvv.addEventListener('focus', function() {
        etiqueta.innerHTML = "* Datos de tarjeta - CVV";

        contenedorTarjeta.classList.add('telcel-controles-tarjeta-de-credito--numero-inactivo');
        contenedorFecha.classList.remove('telcel-controles-tarjeta-de-credito--fecha-inactivo');
        contenedorCvv.classList.remove('telcel-controles-tarjeta-de-credito--cvv-inactivo');
      });

      cvv.addEventListener('blur', function() {
        etiqueta.innerHTML = "* Datos de tarjeta";
      });


    }

  }


  function telcelControlesListenerCampoTexto() {
    var camposDeTexto = document.querySelectorAll('.telcel-controles-campo-de-texto-input');

    Array.prototype.forEach.call(camposDeTexto, function(value, index) {
      /*
        Poner el foco del boton y si tiene boton (cta) presentarlo
      */
      camposDeTexto[index].addEventListener('focus', function(e) {
        var contenedor = Telcel.masCercano(this, '.telcel-controles-campo-de-texto');
        var boton = contenedor.querySelector('.telcel-campo-de-texto-cta');
        contenedor.classList.add('telcel-controles-campo-de-texto-focus');
        /* Buscar boton y hacerlo aparecer */
        if (boton) boton.classList.add('telcel-controles-boton-presente');
      });
      /*
        Poner el foco del boton
      */


      /*
        Quitar el foco del boton y si tiene boton (cta) ocultarlo
      */
      camposDeTexto[index].addEventListener('blur', function(e) {
        var contenedor = Telcel.masCercano(this, '.telcel-controles-campo-de-texto');
        var campoDeTexto = contenedor.querySelector('.telcel-controles-campo-de-texto-input');
        var boton = contenedor.querySelector('.telcel-campo-de-texto-cta');
        contenedor.classList.remove('telcel-controles-campo-de-texto-focus');
        /* Buscar boton y ocultarlo */
        if (boton && campoDeTexto.value == "") setTimeout(function() {
          boton.classList.remove('telcel-controles-boton-presente')
        }, 4000);

      });
      /*
        Quitar el foco del boton
      */
    });

  }

  /*
    Listeners select simulado
  */

  function telcelControlesListenerSelect() {

    var tituloSelectSimulado = document.querySelector('.telcel-controles-titulo-select-simulado');
    var opcionesSelectSimulado = document.querySelectorAll('.telcel-controles-select-opciones a');

    if (tituloSelectSimulado) {
      tituloSelectSimulado.onclick = function() {
        this.parentNode.classList.add('active');
      };
    }

    [].forEach.call(opcionesSelectSimulado, function(opcionesSelectSimulado) {
      opcionesSelectSimulado.onclick = function(e) {
        e.preventDefault();

        var opcionSelectTemporal = this.innerHTML;
        var contenedorSelectTemporal = Telcel.masCercano(this, '.telcel-controles-contenedor-dropdown');

        contenedorSelectTemporal.querySelector('.telcel-controles-titulo-select-simulado').innerHTML = opcionSelectTemporal;

        contenedorSelectTemporal.classList.remove('active')

      }

    })



  }


  /*
    Listeners Botones para validacion del formulario
  */
  function telcelControlesListenerBoton() {

    var botones = document.querySelectorAll('.telcel-campo-de-texto-cta');

    Array.prototype.forEach.call(botones, function(value, index) {
      var boton = botones[index];

      if (boton) {
        botones[index].addEventListener('click', function(e) {
          e.preventDefault();
          var idFormulario = Telcel.masCercano(this, 'form').id;
          var accion = this.getAttribute('data-accion');
          ValidadorControlesTelcel.init(idFormulario, accion);
        });
      }
    });


  }

  /*
    Listener para determinar si hay un boton deshabilitado que requiere de ciertos
    campos para habilitarse.
  */
  function telcelControlesListenerHabilitarBoton() {
    var formularios = document.querySelectorAll('form');

    for (var i = 0; i < formularios.length; i++) {

      var formularioActual = formularios[i];
      var botonDesactivado = formularioActual.querySelector('.telcel-controles-boton-desactivado');

      /*
        Entra si el formulario tiene un boton desactivado que necesita que ciertos campos esten llenos
        para que se activen.
       */
      if (botonDesactivado) {

        /*
          Se buscan todos los campos dentro del formulario para verificar si son requeridos o no.
        */
        recorrerInputsEnFormulario(formularioActual, asignarListenersCampos);

      }
      //Fin del If boton desactivado

    }


  }
  /*
    Listener para determinar si hay un boton deshabilitado que requiere de ciertos
    campos para habilitarse.
  */

  function verificarHabilitarBoton(campo) {


    var formularioActual = Telcel.masCercano(campo, '.telcel-controles-formulario');
    var campos = formularioActual.querySelectorAll('.telcel-controles-campo-de-texto-input');
    var boton = formularioActual.querySelector('.telcel-controles-siguiente');

    var camposLlenos = true;

    for (var j = 0; j <= campos.length; j++) {

      /*
        Si el elemento tiene validacion de requerido, entonces le asigna el listener
      */
      var campo = campos[j];
      var validacion = campo != undefined ? campo.getAttribute('data-form-validation') : undefined;

      if (validacion != undefined && !campo.classList.contains('telcel-controles-oculto')) {

        var validacionObj = JSON.parse(validacion);

        for (var i = 0; i < validacionObj.length; i++) {

          for (var prop in validacionObj[i]) {
            var tipoValidacion = validacionObj[i][prop];

            /*
              Verifica si el campo es requerido
             */
            if (tipoValidacion === "required") {
              if (campo.value === "") camposLlenos = false;
            }

          }

        }
        /*
          Fin de la asignacion del listener
        */

      }

    }

    if (camposLlenos) boton.classList.remove('telcel-controles-boton-desactivado');
    else boton.classList.add('telcel-controles-boton-desactivado');

  }

  function asignarListenersCampos(campo) {
    campo.addEventListener("keyup", function() {
      verificarHabilitarBoton(campo);
    }, false);
    campo.addEventListener("change", function() {
      verificarHabilitarBoton(campo);
    }, false);
  }

  function recorrerInputsEnFormulario(formularioActual, cb) {

    var campos = formularioActual.querySelectorAll('.telcel-controles-campo-de-texto-input');
    for (var j = 0; j <= campos.length; j++) {

      /*
        Si el elemento tiene validacion de requerido, entonces le asigna el listener
      */
      var campo = campos[j];
      var validacion = campo != undefined ? campo.getAttribute('data-form-validation') : undefined;

      //input.classList.contains('telcel-controles-oculto')

      if (validacion != undefined) {

        var validacionObj = JSON.parse(validacion);

        for (var i = 0; i < validacionObj.length; i++) {

          for (var prop in validacionObj[i]) {
            var tipoValidacion = validacionObj[i][prop];

            /*
              Verifica si el campo es requerido
             */
            if (tipoValidacion === "required") {

              asignarListenersCampos(campo);

            }

          }

        }
        /*
          Fin de la asignacion del listener
        */

      }

    }
  }


  /*
    Agrega o quita la clase telcel-controles-oculto, la cual previene validaciones
    en campos que estan ocultos.
  */
  function cambiarOcultos(contenedor, accion) {
    var campos = contenedor.querySelectorAll('.telcel-controles-campo-de-texto-input');
    for (var j = 0; j <= campos.length; j++) {
      var campo = campos[j];

      if (campo != undefined) {
        if (accion === "ocultar") campo.classList.remove('telcel-controles-oculto');
        else campo.classList.add('telcel-controles-oculto');
      }

    }
  }


  /*
    Limpia los campos de texto dado un contenedor.
  */
  function limpiarCampos(contenedor) {
    var campos = contenedor.querySelectorAll('.telcel-controles-campo-de-texto-input');
    for (var j = 0; j <= campos.length; j++) {
      var campo = campos[j];

      if (campo != undefined) {
        campo.value = "";
      }

    }
  }


  function funcionEjemplo() {
    alert('Invocando al callback una vez validado el formulario');
  }

  function barraSelectsPosition() {
    $(window).scroll(comprobarPosicionPagina)
    var position = $(document).scrollTop()
  }

  function comprobarPosicionPagina() {

    var compSelects,
      contenedorCeleste = document.querySelector('.tienda-select-comparador-contenedor');

    if (contenedorCeleste) {
      compSelects = $('.tienda-select-comparador-contenedor');
    } else {
      compSelects = $('.contenedor-selects');
    }

    if (window.pageYOffset > 180) {
      compSelects.addClass('fixed-select');
      $('.contenedor-filtros-orden').css("display", "none");
      if ($(window).width() <= 767) {
        $('.telcel-controles--hidden-sm').css("display", "none");
      }
    } else {
      compSelects.removeClass('fixed-select')
      if ($(window).width() <= 767) {
        $('.contenedor-filtros-orden').css("display", "grid");
        $('.telcel-controles--hidden-sm').css("display", "block");
      } else {
        $('.contenedor-filtros-orden').css("display", "flex");
        $('.telcel-controles--hidden-sm').css("display", "block");
      }

    }
  }



  function init() {
    telcelControlesListenerCampoTexto();
    telcelControlesListenerBoton();
    telcelControlesListenerHabilitarBoton();
    telcelControlesListenerSelect();
    telcelControlesListenerTarjetaCredito();
    telcelControlesSoloNumeros();
    telcelControlesSoloLetras();
    telcelControlesMostrarContrasena();
    telcelControlesSelectCheckbox();
    telcelControlesSelectCheckboxConfirmar();
    telcelControlesSelectCheckboxLista();
    barraSelectsPosition();
  }

  return {
    init: init,
    cambiarOcultos: cambiarOcultos,
    limpiarCampos: limpiarCampos,
    verificarHabilitarBoton: verificarHabilitarBoton,
    funcionEjemplo: funcionEjemplo
  }

}());



var ValidadorControlesTelcel = (function() {

  function validator_required(input, obj) {
    var value = input.value;
    if (value === '') validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function validator_min_length(input, obj) {
    var value = input.value,
      min_length = obj.min_length;

    if (value.length < min_length && value !== '') validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function validator_max_length(input, obj) {
    var value = input.value,
      max_length = obj.max_length;

    if (value.length > max_length && value !== '') {
      validator_print_error(input, obj);
    } else validator_clear_error(input, obj);
  }

  function validator_email(input, obj) {
    var value = input.value,
      re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(value) && value !== '') validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function validator_only_numbers(input, obj) {
    var value = input.value,
      re = /^\d+$/;

    if (!re.test(value) && value !== '') validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function validator_only_letters(input, obj) {
    var value = input.value,
      re = /^[a-zA-Z]*$/;

    if (!re.test(value) && value !== '') validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function special_characters(input, obj) {
    var value = input.value,
      re = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;

    if (re.test(value) && value !== '') validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function validator_adjacente(input, obj) {
    var value = input.value,
      re = /([a-z])\1/ig;

    if (re.test(value) && value !== '') validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function validator_no_accents(input, obj) {
    var value = input.value,
      re = /[À-ž]/;

    if (re.test(value) && value !== '') validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function validator_no_whitespace(input, obj) {
    var value = input.value,
      re = /[\s]/;

    if (re.test(value) && value !== '') validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function validator_confirmation(input, obj) {
    var value = input.value,
      target = document.getElementById(obj.target_id).value;

    if (value !== target) validator_print_error(input, obj);
    else validator_clear_error(input, obj);

  }

  function validator_not_equal(input, obj) {
    var value = input.value,
      target = document.getElementById(obj.target_id).value,
      targetInput = document.getElementById(obj.target_id);

    if (value !== target) {
      validator_print_error(input, obj);
    } else {
      validator_clear_error(input, obj);
      return;
    }

  }

  function validator_checkbox(input, obj) {
    if (!input.checked) validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function validator_select(input, obj) {
    if (input.value === "") validator_print_error(input, obj);
    else validator_clear_error(input, obj);
  }

  function validator_print_error(input, validation_obj) {
    var obj = $(input),
      cont = obj.closest('.telcel-controles-contenedor'),
      help_block = cont.find('.telcel-controles-error-contenido'),
      error_message = validation_obj.error_msg;

    if (help_block.length === 0) {
      help_block.remove();
      cont.addClass('telcel-controles-error-contenedor');
      cont.addClass('validation_' + validation_obj.validation);
      cont.append('<span class="telcel-controles-error-contenido">' + error_message + '</span>');
    }
  }

  function validator_clear_error(input, validation_obj) {
    var obj = $(input),
      cont = obj.closest('.telcel-controles-contenedor'),
      custom_class = 'validation_' + validation_obj.validation;

    if (cont.hasClass('telcel-controles-error-contenedor') && cont.hasClass(custom_class)) {
      cont.removeClass('telcel-controles-error-contenedor');
      cont.removeClass(custom_class);
      cont.find('.telcel-controles-error-contenido').remove();
    }
  }

  function es_fecha_valida(fecha) {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fecha))
      return false;

    var partes = fecha.split("/");
    var dia = parseInt(partes[1], 10);
    var mes = parseInt(partes[0], 10);
    var anio = parseInt(partes[2], 10);

    if (anio < 1000 || anio > 3000 || mes == 0 || mes > 12)
      return false;

    var longitudMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (anio % 400 == 0 || (anio % 100 != 0 && anio % 4 == 0)) {
      longitudMes[1] = 29;
    }

    return dia > 0 && dia <= longitudMes[mes - 1];
  }

  function validator_fecha(input, validation_obj) {

    var fecha = input.value;

    if (es_fecha_valida(fecha)) {
      validator_clear_error(input, validation_obj);
    } else {
      validator_print_error(input, validation_obj);
    }

  }

  function go_up() {
    if ($('.comp-ecommerce-header').length > 0) {
      $("html, body").animate({
        scrollTop: $('.help-block').closest('.row').first().offset().top - 85
      }, 600);
    } else {
      $("html, body").animate({
        scrollTop: $('.help-block').closest('.row').first().offset().top
      }, 600);
    }
  }

  function trigger(formulario, cb) {
    var f = $('#' + formulario);

    /*
      Check if there's a callback function, if there's not, it submits the form
    */
    if (f.find('.telcel-controles-error-contenedor').length === 0) {
      if (cb) {
        Telcel.ejecutarFuncionPorNombre(cb, window);
      } else f.submit();
    }
    //else go_up();
  }

  function classifier(input) {

    var type = JSON.parse(input.getAttribute('data-form-validation'));

    for (var i = 0; i < type.length; i++) {

      for (var prop in type[i]) {

        var validation_type = type[i][prop],
          validation = type[i];

        if (!input.classList.contains('telcel-controles-oculto')) {

          if (validation_type === "required") {
            validator_required(input, validation);
          } else if (validation_type === "minlength") {
            validator_min_length(input, validation);
          } else if (validation_type === "fecha") {
            validator_fecha(input, validation);
          } else if (validation_type === "maxlength") {
            validator_max_length(input, validation);
          } else if (validation_type === "email") {
            validator_email(input, validation);
          } else if (validation_type === "onlynumbers") {
            validator_only_numbers(input, validation);
          } else if (validation_type === "specialcharacters") {
            special_characters(input, validation);
          } else if (validation_type === "confirmation") {
            validator_confirmation(input, validation);
          } else if (validation_type === "not_equal") {
            validator_not_equal(input, validation);
          } else if (validation_type === "onlyletters") {
            validator_only_letters(input, validation);
          } else if (validation_type === "noaccents") {
            validator_no_accents(input, validation);
          } else if (validation_type === "nowhitespace") {
            validator_no_whitespace(input, validation);
          } else if (validation_type === "checkbox") {
            validator_checkbox(input, validation);
          } else if (validation_type === "select") {
            validator_select(input, validation);
          } else if (validation_type === "adjacente") {
            validator_adjacente(input, validation);
          }

        }



      }

    }

  }

  function finder(id) {
    var inputs, index;

    inputs = document.getElementById(id);

    for (index = 0; index < inputs.length; ++index) {
      var input = inputs[index];
      if (input.hasAttribute('data-form-validation')) {
        classifier(input);
        assignarListeners(input);
      }
    }

    function assignarListeners(i) {
      i.addEventListener("keyup", function() {
        classifier(i);
      }, false);
      i.addEventListener("change", function() {
        classifier(i);
      }, false);
    }

  }

  return {
    init: function(id, callback) {
      finder(id);
      trigger(id, callback);
    }
  };

})();

$(document).ready(function() {
  TelcelControles.init();
});