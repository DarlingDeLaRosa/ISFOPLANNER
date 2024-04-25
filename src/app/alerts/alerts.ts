import Swal from "sweetalert2"

export function alertIsSuccess(respuesta: boolean) {
  if (respuesta) {

    Swal.fire({
      icon: 'success',
      title: 'Guardado correctamente.',
      showConfirmButton: false,
      timer: 2000
    })

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Ocurrio un error, No se pudo guardar el cambio.',
      text: 'Intente nuevamente.',
      showConfirmButton: true,
      confirmButtonColor: 'red',
    })
  }
}


export function alertRemoveSuccess() {
  Swal.fire({
    icon: 'success',
    title: 'Eliminado correctamente.',
    showConfirmButton: false,
    timer: 2000
  })
}

export function errorMessageAlert(message: string) {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: message,
    confirmButtonColor: 'red',
  })
}

export function warningMessageAlert(message: string) {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: message,
    confirmButtonColor: 'red',
  })
}

export function successMessageAlert(message: string) {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}

export function infoMessageAlert(message: string) {
  Swal.fire({
    position: 'center',
    icon: 'info',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}

export function alertRemoveSure(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    Swal.fire({
      title: '¡Alerta!',
      text: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#004b8d',
      cancelButtonColor: '#aaa',
    }).then((result) => {

      if (result.isConfirmed) {
        resolve(true)
      } else {
        resolve(false)
      }
    });
  })
}

export function alertServerDown() {
  Swal.fire({
    icon: 'error',
    title: 'Se ha producido un error \n No se pudo conectar con el servidor.',
    text: 'Intente mas tarde, Si el error persiste consulte al ADMINISTRADOR.',
    showConfirmButton: true,
    confirmButtonColor: 'red',
  })
}


export function alertPeriod(title: string, text: string) {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonColor: 'red',
  })
}

export function alertPeriodDone(title: string, text: string) {
  Swal.fire({
    icon: 'error',
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonColor: 'red',
  })
}

export function alertNoValidForm() {
  Swal.fire({
    icon: 'info',
    title: 'Completa los campos requeridos para realizar la acción',
    showConfirmButton: false,
    timer: 2000
  })
}

export function unitActive(unit: string) {
  Swal.fire({
    icon: 'success',
    title: `Ahora actualizando el POA \n ${unit}`,
    showConfirmButton: false,
    timer: 3250
  })
}

export function loading(load: boolean) {
  if (load) {
    Swal.fire({
      width: '200px',
      padding: 0,
      html: '<div class="loader"></div><h3 style="margin-bottom:7px">Cargando...</h3>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    })
  }
  else {
    Swal.close();
  }
}
