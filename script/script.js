var ColaLis;
var ColaBloq;
var ColaSus;
var ColaTer;
var CantidadProcesos;
var bloqueado;
var sumaTiempos;
var estadosArr;
var gant, canvas, ctx;

var cpt = 0;
var ct = 0;
var stt = 0;

var ColaLisB;
var ColaBloqB;
var ColaSusB;
var ColaTerB;
var CantidadProcesosB;
var bloqueadoB;
var estadosArrB;
var gantB, canvasB, ctxB;

var ColaLisC;
var ColaBloqC;
var ColaSusC;
var ColaTerC;
var CantidadProcesosC;
var bloqueadoC;
var estadosArrC;
var gantC, canvasC, ctxC;

var Parlantes;
var Puerto;
var Impresora;
var Red;
var Disp;
var Procesos, ProcesosB, procesosC;
var pausar = false;
var pausar2 = false;
var pausar3 = false;


$(document).ready(function() {

    canvas = document.getElementById("gant");
    canvasB = document.getElementById("gantB");
    canvasC = document.getElementById("gantC");

    ctx = canvas.getContext("2d");
    ctxB = canvasB.getContext("2d");
    ctxC = canvasC.getContext("2d");

    bloqueado = false;
    bloqueadoB = false;
    bloqueadoC = false;

    CantidadProcesos = Math.floor((Math.random() * 3) + 5);
    CantidadProcesosB = Math.floor((Math.random() * 3) + 5);
    CantidadProcesosC = Math.floor((Math.random() * 3) + 5);


    $("#gant").attr("height", 23 * CantidadProcesos);
    $("#contenedor").height(400 + (CantidadProcesos * 32));
    $("#contenedor2").height(100 + (CantidadProcesos * 23));
    $(".columna").height(20 + (CantidadProcesos * 35));

    $("#gantB").attr("height", 23 * CantidadProcesosB);
    $("#contenedor3").height(400 + (CantidadProcesosB * 32));
    $("#contenedor4").height(100 + (CantidadProcesosB * 23));
    $(".columnaB").height(20 + (CantidadProcesosB * 35));

    $("#gantC").attr("height", 23 * CantidadProcesosC);
    $("#contenedor5").height(400 + (CantidadProcesosC * 32));
    $("#contenedor6").height(100 + (CantidadProcesosC * 23));
    $(".columnaC").height(20 + (CantidadProcesosC * 35));

    ColaLis = new cola();
    ColaBloq = new cola();
    ColaSus = new cola();
    ColaTer = new cola();

    ColaLisB = new cola();
    ColaBloqB = new cola();
    ColaSusB = new cola();
    ColaTerB = new cola();

    ColaLisC = new cola();
    ColaBloqC = new cola();
    ColaSusC = new cola();
    ColaTerC = new cola();

    Parlantes = new Dispositivo("Parlantes", 0);
    Puerto = new Dispositivo("Puerto", 0);
    Impresora = new Dispositivo("Impresora", 0);
    Red = new Dispositivo("Red", 0);
    // alert("esta lelgando2");
    Disp = new Array();
    Disp.push(Parlantes);
    Disp.push(Puerto);
    Disp.push(Impresora);
    Disp.push(Red);

    LlenarCola(CantidadProcesos);
    ColaLis.ordenarQuantum(CantidadProcesos);
    DiagramarCola(0);

    LlenarColaB(CantidadProcesosB);
    ColaLisB.ordenarQuantum(CantidadProcesosB);
    DiagramarColaB(0);

    LlenarColaC(CantidadProcesosC);
    ColaLisC.ordenarQuantum(CantidadProcesosC);
    DiagramarColaC(0);

    Crearbloqueo();
    CrearbloqueoB();
    CrearbloqueoC();

    recursos();

    SRTF();
    SRTFB();
    SRTFC();
    //cpuContenedor= 0;

    $('#btn_recursos').on("click", function() {
        var no = $('#i_recurso').val();
        if (no != "") {
            Nuevo = new Dispositivo(no, 0);
            Disp.push(Nuevo)
            agregarRecurso(Disp);
            $('#sel').append('<option value="' + no + '">' + no + '</option>');
            $('#sel2').append('<option value="' + no + '">' + no + '</option>');
            $('#sel3').append('<option value="' + no + '">' + no + '</option>');

            $('#i_recurso').val("");
        } else {
            alert("campo vacio");
        }

    })

    $('#btn_proceso1').on("click", agregarProceso);
    $('#btn_proceso2').on("click", agregarProcesoB);
    $('#btn_proceso3').on("click", agregarProcesoC);
    $('#metricasf').on("click", calcularMetrica);

    $('#recursosadd').on('click', function() {
        $('#contenedorR').slideToggle('slow', 'swing'); //linear o swing mirar librerias para mas efectos

    })

    $('#btnP1').on('click', function() {
        var valor = $('#selectPausar').val();
        //if (valor==1) pausar=!pausar;
        //if (valor==2) pausar2=!pausar2;
        //if (valor==3) pausar3=!pausar3;
        pausar = !pausar;
        pausar2 = !pausar2;
        pausar3 = !pausar3;
    })

});

function recursos() {
    for (var i = 0; i < Disp.length; i++) {
        $('#sel').append('<option value="' + Disp[i].nombre + '">' + Disp[i].nombre + '</option>');
        $('#sel2').append('<option value="' + Disp[i].nombre + '">' + Disp[i].nombre + '</option>');
        $('#sel3').append('<option value="' + Disp[i].nombre + '">' + Disp[i].nombre + '</option>');
    }
}


function agregarProceso() {
    var T;
    var rec = $('#sel').val();
    for (var i = 0; i < Disp.length; i++) {
        if (Disp[i].nombre == rec) break;

    }

    if ($('#t1').val() != "" && $('#t1').val() > 0) {

        T = $('#t1').val();
    } else { T = Math.floor((Math.random() * 4) + 8); }



    var ID = Procesos + 1;

    sumaTiempos += T;
    var Q = T;
    var R = Disp[i];
    var E = "Nuevo";
    estadosArr[Procesos] = E;
    ColaLis.insertarUltimo(ID, T, Q, R, E);
    Procesos = Procesos + 1;
    CantidadProcesos = CantidadProcesos + 1;
    Crearbloqueo();
    canvas.width = canvas.width;
    canvas.height = canvas.height + 20;
    ColaLis.ordenarQuantum(CantidadProcesos);
    DiagramarCola(0);


}

function agregarProcesoB() {
    var T;
    var rec = $('#sel2').val();
    for (var i = 0; i < Disp.length; i++) {
        if (Disp[i].nombre == rec) break;

    }

    if ($('#t2').val() != "" && $('#t2').val() > 0)
        T = $('#t2').val();
    else T = Math.floor((Math.random() * 4) + 8);

    var ID = ProcesosB + 1;

    //sumaTiempos+=T;
    var Q = T;
    var R = Disp[i];
    var E = "Nuevo";
    estadosArrB[ProcesosB] = E;
    ColaLisB.insertarUltimo(ID, T, Q, R, E);
    ProcesosB = ProcesosB + 1;
    CantidadProcesosB = CantidadProcesosB + 1;
    CrearbloqueoB();
    canvasB.width = canvasB.width;
    canvasB.height = canvasB.height + 20;
    ColaLisB.ordenarQuantum(CantidadProcesos);
    DiagramarColaB(0);

}

function agregarProcesoC() {

    var T;
    var rec = $('#sel3').val();
    for (var i = 0; i < Disp.length; i++) {
        if (Disp[i].nombre == rec) break;

    }

    if ($('#t3').val() != "" && $('#t3').val() > 0)
        T = $('#t3').val();
    else T = Math.floor((Math.random() * 4) + 8);

    var ID = ProcesosC + 1;

    //sumaTiempos+=T;
    var Q = T;
    var R = Disp[i];
    var E = "Nuevo";
    estadosArrC[ProcesosC] = E;
    ColaLisC.insertarUltimo(ID, T, Q, R, E);
    ProcesosC = ProcesosC + 1;
    CantidadProcesosC = CantidadProcesosC + 1;
    CrearbloqueoC();
    canvasC.width = canvasC.width;
    canvasC.height = canvasC.height + 20;
    ColaLisC.ordenarQuantum(CantidadProcesos);
    DiagramarColaC(0);

}


function agregarRecurso(recurso) {
    var text = "";
    for (var i = 0; i < recurso.length; i++) {
        text += recurso[i].nombre + " " + recurso[i].estado + "<br>";
        $("#recursos").html("<p>" + text + "<br></p>");
    }
}

function Dispositivo(nombre, estado) {
    this.nombre = nombre;
    this.estado = estado;
}


function LlenarCola(procesos) {
    estadosArr = new Array();
    for (i = 0; i < procesos; i++) {
        sumaTiempos = 0;
        var ID = i + 1;
        var T = Math.floor((Math.random() * 4) + 8);
        sumaTiempos += T;
        var Q = T;
        var R = Disp[Math.floor(Math.random() * Disp.length)];
        var E = "Nuevo";
        estadosArr[i] = E;
        ColaLis.insertarUltimo(ID, T, Q, R, E);
    }
    Procesos = i;
    DiagramarCola(0);
}

function LlenarColaB(procesosB) {
    estadosArrB = new Array(CantidadProcesosB);
    for (i = 0; i < procesosB; i++) {
        var ID = i + 1;
        var T = Math.floor((Math.random() * 4) + 8);
        var Q = T;
        var R = Disp[Math.floor(Math.random() * Disp.length)];
        var E = "Nuevo";
        estadosArrB[i] = E;
        ColaLisB.insertarUltimo(ID, T, Q, R, E);
    }
    ProcesosB = i;
    DiagramarColaB(0);
}

function LlenarColaC(procesosC) {
    estadosArrC = new Array(CantidadProcesosC);
    for (i = 0; i < procesosC; i++) {
        var ID = i + 1;
        var T = Math.floor((Math.random() * 4) + 8);
        var Q = T;
        var R = Disp[Math.floor(Math.random() * Disp.length)];
        var E = "Nuevo";
        estadosArrC[i] = E;
        ColaLisC.insertarUltimo(ID, T, Q, R, E);
    }
    ProcesosC = i;
    DiagramarColaC(0);
}

function Crearbloqueo() {
    gant = new Array();
    for (i = 0; i < CantidadProcesos; i++) {
        gant[i] = [];
        for (j = 0; j < CantidadProcesos; j++) {
            gant[i].push(i);
        }
    }
    console.log(gant);
}

function CrearbloqueoB() {
    gantB = new Array(CantidadProcesosB);
    for (i = 0; i < CantidadProcesosB; i++) {
        gantB[i] = [];
        for (j = 0; j < CantidadProcesosB; j++) {
            gantB[i].push(i);
        }
    }
    console.log(gantB);
}

function CrearbloqueoC() {
    gantC = new Array(CantidadProcesosC);
    for (i = 0; i < CantidadProcesosC; i++) {
        gantC[i] = [];
        for (j = 0; j < CantidadProcesosC; j++) {
            gantC[i].push(i);
        }
    }
    console.log(gantC);
}

function SRTF() {
    var Tiempo0 = true;
    var TiempoT = true;
    var nodo;
    var nodo2;
    var TiempoSuspendido = Math.floor((Math.random() * 3) + 3);
    var TiempoBloqueado = Math.floor((Math.random() * 3) + 3);
    var nAtendidos = 0;
    var clock = 0;

    var hilo = setInterval(function() {
        if (pausar == false) {
            agregarRecurso(Disp);
            $("#reloj").html("Sección Crítica: " + clock + " Milisegundos");
            clock = Math.round((clock + 0.1) * 10) / 10;;
            if (Tiempo0) {
                if (!ColaLis.vacia()) {

                    nodo = ColaLis.extraerPrimero();

                    if (recursoBloq(nodo)) {
                        DiagramarCola(0);
                        TransicionDibujo(nodo, 1);
                        nodo.estado = "Critico";
                        estadosArr[nodo.proceso - 1] = nodo.estado;
                        bloquearRecurso(nodo);
                        mensaje(nodo, 0);
                        DiagramarProceso(nodo);
                        Tiempo0 = false;
                        TiempoT = true;
                    } else {
                        nodo.quantum = Math.floor((Math.random() * 3) + 6);
                        nodo.estado = "Bloqueado";
                        estadosArr[nodo.proceso - 1] = nodo.estado;
                        //LiberarRec(nodo);
                        mensaje(nodo, 1);
                        ColaBloq.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                        DiagramarProceso(null);
                        DiagramarCola(1);
                        DiagramarCola(0);
                        TiempoT = false;
                        Tiempo0 = true;
                    }
                } else {
                    //Parlantes = 0;
                    //Puerto = 0;
                    //Impresora = 0; 
                    //Red = 0;
                }
            }
            if (TiempoT) {
                if (nodo.tiempo > 0) {
                    if (nodo.quantum > 0) {
                        if (!bloqueo(1)) {
                            nodo.quantum = Math.round((nodo.quantum - 0.1) * 10) / 10;
                            nodo.tiempo = Math.round((nodo.tiempo - 0.1) * 10) / 10;

                            if (!ColaLis.vacia()) {
                                nodo2 = ColaLis.extraerPrimero();
                                if (nodo.quantum < nodo2.quantum) {
                                    ColaLis.insertarUltimo(nodo2.proceso, nodo2.tiempo, nodo2.quantum, nodo2.recurso, nodo2.estado);
                                    ColaLis.ordenarQuantum(CantidadProcesos);
                                } else {
                                    var nodoTemp = nodo;
                                    nodo = nodo2;
                                    nodoTemp.quantum = Math.floor((Math.random() * 3) + 6);
                                    nodoTemp.estado = "Suspendido";
                                    estadosArr[nodoTemp.proceso - 1] = nodoTemp.estado;
                                    LiberarRec(nodoTemp);
                                    mensaje(nodoTemp, 1);
                                    ColaSus.insertarUltimo(nodoTemp.proceso, nodoTemp.tiempo, nodoTemp.quantum, nodoTemp.recurso, nodoTemp.estado);
                                    DiagramarProceso(nodo);
                                    DiagramarCola(1);
                                    DiagramarCola(0);
                                    DiagramarCola(2);
                                }
                            }

                            DiagramarProceso(nodo);
                            DiagramarGant(nodo.proceso - 1);
                        } else {
                            nodo.quantum = Math.floor((Math.random() * 3) + 2);
                            nodo.estado = "Bloqueado";
                            estadosArr[nodo.proceso - 1] = nodo.estado;
                            LiberarRec(nodo);
                            mensaje(nodo, 1);
                            ColaBloq.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                            DiagramarProceso(null);
                            DiagramarCola(1);
                            TiempoT = false;
                            Tiempo0 = true;
                            mensaje(nodo, 0);
                        }
                    } else {
                        nodo.quantum = Math.floor((Math.random() * 3) + 2);
                        LiberarRec(nodo);
                        mensaje(nodo, 1);
                        nodo.estado = "Suspendido";
                        estadosArr[nodo.proceso - 1] = nodo.estado;
                        ColaSus.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                        DiagramarProceso(null);
                        DiagramarCola(2);
                        TiempoT = false;
                        Tiempo0 = true;
                    }
                } else {
                    nodo.estado = "Terminado";
                    estadosArr[nodo.proceso - 1] = nodo.estado;
                    ColaTer.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                    LiberarRec(nodo);
                    mensaje(nodo, 1);
                    DiagramarProceso(null);
                    DiagramarCola(3);
                    TiempoT = false;
                    Tiempo0 = true;
                    nAtendidos++;
                }
            }
            if (!ColaSus.vacia()) {
                if (TiempoSuspendido > 0) {
                    TiempoSuspendido -= 0.1;
                } else {
                    TiempoSuspendido = Math.floor((Math.random() * 2) + 2); //TIEMPO QUE SE DEMORAN EN ColaSus 2-4
                    var temp = ColaSus.extraerPrimero();
                    ColaLis.insertarUltimo(temp.proceso, temp.tiempo, temp.tiempo, nodo.recurso, "Listo");
                    ColaLis.ordenarQuantum(CantidadProcesos);
                    estadosArr[temp.proceso - 1] = "Listo";
                    DiagramarCola(0);
                    DiagramarCola(2);
                }
            }
            if (!ColaBloq.vacia()) {

                var temp = ColaBloq.extraerPrimero();
                if (!TiempoT && ColaLis.vacia()) {
                    DiagramarGant(temp.proceso - 1);
                }

                if (recursoBloq(temp)) {


                    ColaLis.insertarUltimo(temp.proceso, temp.tiempo, temp.tiempo, temp.recurso, "Listo", temp.prioridad);
                    ColaLis.ordenarQuantum(CantidadProcesos);
                    estadosArr[temp.proceso - 1] = "Listo";
                    DiagramarCola(0);
                    DiagramarCola(1);
                } else {
                    ColaBloq.insertarUltimo(temp.proceso, temp.tiempo, temp.tiempo, temp.recurso, "Bloqueado", temp.prioridad);
                    estadosArr[temp.proceso - 1] = "Bloqueado";
                    ColaBloq.ordenarQuantum(CantidadProcesos);


                }
            }
            if (nAtendidos == CantidadProcesos) {
                $("#mensaje").html("Todos los procesos se han atendido exitosamente!");
                clearInterval(hilo);

                ct += clock;
                cpt += CantidadProcesos;
                stt += sumaTiempos;

                calcularMetrica1(CantidadProcesos, clock, sumaTiempos);
            }
        }
    }, 50); //<---VELOCIDAD DEL HILO EN MS
}


function SRTFB() {
    var Tiempo0 = true;
    var TiempoT = true;
    var nodo;
    var nodo2;
    var TiempoSuspendido = Math.floor((Math.random() * 3) + 3);
    var TiempoBloqueado = Math.floor((Math.random() * 3) + 3);
    var nAtendidos = 0;
    var clock = 0;

    var hilo = setInterval(function() {
        if (pausar2 == false) {
            agregarRecurso(Disp);
            $("#relojB").html("Sección Crítica: " + clock + " Milisegundos");
            clock = Math.round((clock + 0.1) * 10) / 10;;
            if (Tiempo0) {
                if (!ColaLisB.vacia()) {

                    nodo = ColaLisB.extraerPrimero();

                    if (recursoBloq(nodo)) {
                        DiagramarColaB(0);
                        TransicionDibujoB(nodo, 1);
                        nodo.estado = "Critico";
                        estadosArrB[nodo.proceso - 1] = nodo.estado;
                        bloquearRecurso(nodo);
                        mensajeB(nodo, 0);
                        DiagramarProcesoB(nodo);
                        Tiempo0 = false;
                        TiempoT = true;
                    } else {
                        nodo.quantum = Math.floor((Math.random() * 3) + 6);
                        nodo.estado = "Bloqueado"
                        estadosArrB[nodo.proceso - 1] = nodo.estado;
                        //LiberarRec(nodo);
                        mensajeB(nodo, 1);
                        ColaBloqB.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                        DiagramarProcesoB(null);
                        DiagramarColaB(1);
                        DiagramarColaB(0);
                        TiempoT = false;
                        Tiempo0 = true;
                    }
                } else {
                    //Parlantes = 0;
                    //Puerto = 0;
                    //Impresora = 0; 
                    //Red = 0;
                }
            }
            if (TiempoT) {
                if (nodo.tiempo > 0) {
                    if (nodo.quantum > 0) {
                        if (!bloqueo(1)) {
                            nodo.quantum = Math.round((nodo.quantum - 0.1) * 10) / 10;
                            nodo.tiempo = Math.round((nodo.tiempo - 0.1) * 10) / 10;

                            if (!ColaLisB.vacia()) {
                                nodo2 = ColaLisB.extraerPrimero();
                                if (nodo.quantum < nodo2.quantum) {
                                    ColaLisB.insertarUltimo(nodo2.proceso, nodo2.tiempo, nodo2.quantum, nodo2.recurso, nodo2.estado);
                                    ColaLisB.ordenarQuantum(CantidadProcesos);
                                } else {
                                    var nodoTemp = nodo;
                                    nodo = nodo2;
                                    nodoTemp.quantum = Math.floor((Math.random() * 3) + 6);
                                    nodoTemp.estado = "Suspendido";
                                    estadosArrB[nodoTemp.proceso - 1] = nodoTemp.estado;
                                    LiberarRec(nodoTemp);
                                    mensajeB(nodoTemp, 1);
                                    ColaSusB.insertarUltimo(nodoTemp.proceso, nodoTemp.tiempo, nodoTemp.quantum, nodoTemp.recurso, nodoTemp.estado);
                                    DiagramarProcesoB(nodo);
                                    DiagramarColaB(1);
                                    DiagramarColaB(0);
                                    DiagramarColaB(2);
                                }
                            }

                            DiagramarProcesoB(nodo);
                            DiagramarGantB(nodo.proceso - 1);
                        } else {
                            nodo.quantum = Math.floor((Math.random() * 3) + 2);
                            nodo.estado = "Bloqueado"
                            estadosArrB[nodo.proceso - 1] = nodo.estado;
                            LiberarRec(nodo);
                            mensajeB(nodo, 1);
                            ColaBloqB.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                            DiagramarProcesoB(null);
                            DiagramarColaB(1);
                            TiempoT = false;
                            Tiempo0 = true;
                            mensajeB(nodo, 0);
                        }
                    } else {
                        nodo.quantum = Math.floor((Math.random() * 3) + 2);
                        LiberarRec(nodo);
                        mensajeB(nodo, 1);
                        nodo.estado = "Suspendido";
                        estadosArrB[nodo.proceso - 1] = nodo.estado;
                        ColaSusB.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                        DiagramarProcesoB(null);
                        DiagramarColaB(2);
                        TiempoT = false;
                        Tiempo0 = true;
                    }
                } else {
                    nodo.estado = "Terminado";
                    estadosArrB[nodo.proceso - 1] = nodo.estado;
                    ColaTerB.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                    LiberarRec(nodo);
                    mensajeB(nodo, 1);
                    DiagramarProcesoB(null);
                    DiagramarColaB(3);
                    TiempoT = false;
                    Tiempo0 = true;
                    nAtendidos++;
                }
            }
            if (!ColaSusB.vacia()) {
                if (TiempoSuspendido > 0) {
                    TiempoSuspendido -= 0.1;
                } else {
                    TiempoSuspendido = Math.floor((Math.random() * 2) + 2); //TIEMPO QUE SE DEMORAN EN ColaSus 2-4
                    var temp = ColaSusB.extraerPrimero();
                    ColaLisB.insertarUltimo(temp.proceso, temp.tiempo, temp.tiempo, nodo.recurso, "Listo");
                    ColaLisB.ordenarQuantum(CantidadProcesosB);
                    estadosArrB[temp.proceso - 1] = "Listo";
                    DiagramarColaB(0);
                    DiagramarColaB(2);
                }
            }
            if (!ColaBloqB.vacia()) {
                var temp = ColaBloqB.extraerPrimero();
                if (!TiempoT && ColaLisB.vacia()) {
                    DiagramarGantB(temp.proceso - 1);
                }

                if (recursoBloq(temp)) {

                    //TiempoBloqueado = Math.floor((Math.random()*2)+2);//TIEMPO QUE SE DEMORAN EN ColaBloq 2-4
                    //var temp = ColaBloqC.extraerPrimero();
                    ColaLisB.insertarUltimo(temp.proceso, temp.tiempo, temp.tiempo, temp.recurso, "Listo", temp.prioridad);
                    ColaLisB.ordenarQuantum(CantidadProcesosB);
                    estadosArrB[temp.proceso - 1] = "Listo";
                    DiagramarColaB(0);
                    DiagramarColaB(1);

                } else {
                    ColaBloqB.insertarUltimo(temp.proceso, temp.tiempo, temp.tiempo, temp.recurso, "Bloqueado", temp.prioridad);
                    estadosArrB[temp.proceso - 1] = "Bloqueado";
                    ColaBloqB.ordenarQuantum(CantidadProcesos);

                }
            }
            if (nAtendidos == CantidadProcesosB) {
                $("#mensajeB").html("Todos los procesos se han atendido exitosamente!");
                clearInterval(hilo);
                ct += clock;
                cpt += CantidadProcesos;
                stt += sumaTiempos;
                calcularMetrica2(CantidadProcesos, clock, sumaTiempos);
            }
        }
    }, 50); //<---VELOCIDAD DEL HILO EN MS
}

function SRTFC() {
    var Tiempo0 = true;
    var TiempoT = true;
    var nodo;
    var nodo2;
    var TiempoSuspendido = Math.floor((Math.random() * 3) + 3);
    var TiempoBloqueado = Math.floor((Math.random() * 3) + 3);
    var nAtendidos = 0;
    var clock = 0;

    var hilo = setInterval(function() {
        if (pausar3 == false) {
            agregarRecurso(Disp);
            $("#relojC").html("Sección Crítica: " + clock + " Milisegundos");
            clock = Math.round((clock + 0.1) * 10) / 10;;
            if (Tiempo0) {
                if (!ColaLisC.vacia()) {

                    nodo = ColaLisC.extraerPrimero();

                    if (recursoBloq(nodo)) {
                        DiagramarColaC(0);
                        TransicionDibujoC(nodo, 1);
                        nodo.estado = "Critico";
                        estadosArrC[nodo.proceso - 1] = nodo.estado;
                        bloquearRecurso(nodo);
                        mensajeC(nodo, 0);
                        DiagramarProcesoC(nodo);
                        Tiempo0 = false;
                        TiempoT = true;
                    } else {
                        nodo.quantum = Math.floor((Math.random() * 3) + 6);
                        nodo.estado = "Bloqueado"
                        estadosArrC[nodo.proceso - 1] = nodo.estado;
                        //LiberarRec(nodo);
                        mensajeC(nodo, 1);
                        ColaBloqC.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                        DiagramarProcesoC(null);
                        DiagramarColaC(1);
                        DiagramarColaC(0);
                        TiempoT = false;
                        Tiempo0 = true;
                    }
                } else {
                    //Parlantes = 0;
                    //Puerto = 0;
                    //Impresora = 0; 
                    //Red = 0;
                }
            }
            if (TiempoT) {
                if (nodo.tiempo > 0) {
                    if (nodo.quantum > 0) {
                        if (!bloqueo(1)) {
                            nodo.quantum = Math.round((nodo.quantum - 0.1) * 10) / 10;
                            nodo.tiempo = Math.round((nodo.tiempo - 0.1) * 10) / 10;

                            if (!ColaLisC.vacia()) {
                                nodo2 = ColaLisC.extraerPrimero();
                                if (nodo.quantum < nodo2.quantum) {
                                    ColaLisC.insertarUltimo(nodo2.proceso, nodo2.tiempo, nodo2.quantum, nodo2.recurso, nodo2.estado);
                                    ColaLisC.ordenarQuantum(CantidadProcesos);
                                } else {
                                    var nodoTemp = nodo;
                                    nodo = nodo2;
                                    nodoTemp.quantum = Math.floor((Math.random() * 3) + 6);
                                    nodoTemp.estado = "Suspendido";
                                    estadosArrC[nodoTemp.proceso - 1] = nodoTemp.estado;
                                    LiberarRec(nodoTemp);
                                    mensajeC(nodoTemp, 1);
                                    ColaSusC.insertarUltimo(nodoTemp.proceso, nodoTemp.tiempo, nodoTemp.quantum, nodoTemp.recurso, nodoTemp.estado);
                                    DiagramarProcesoC(nodo);
                                    DiagramarColaC(1);
                                    DiagramarColaC(0);
                                    DiagramarColaC(2);
                                }
                            }

                            DiagramarProcesoC(nodo);
                            DiagramarGantC(nodo.proceso - 1);
                        } else {
                            nodo.quantum = Math.floor((Math.random() * 3) + 2);
                            nodo.estado = "Bloqueado"
                            estadosArrC[nodo.proceso - 1] = nodo.estado;
                            LiberarRec(nodo);
                            mensajeC(nodo, 1);
                            ColaBloqC.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                            DiagramarProcesoC(null);
                            DiagramarColaC(1);
                            TiempoT = false;
                            Tiempo0 = true;
                            mensaje(nodo, 0);
                        }
                    } else {
                        nodo.quantum = Math.floor((Math.random() * 3) + 2);
                        LiberarRec(nodo);
                        mensajeC(nodo, 1);
                        nodo.estado = "Suspendido";
                        estadosArrC[nodo.proceso - 1] = nodo.estado;
                        ColaSusC.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                        DiagramarProcesoC(null);
                        DiagramarColaC(2);
                        TiempoT = false;
                        Tiempo0 = true;
                    }
                } else {
                    nodo.estado = "Terminado";
                    estadosArrC[nodo.proceso - 1] = nodo.estado;
                    ColaTerC.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso, nodo.estado);
                    LiberarRec(nodo);
                    mensajeC(nodo, 1);
                    DiagramarProcesoC(null);
                    DiagramarColaC(3);
                    TiempoT = false;
                    Tiempo0 = true;
                    nAtendidos++;
                }
            }
            if (!ColaSusC.vacia()) {
                if (TiempoSuspendido > 0) {
                    TiempoSuspendido -= 0.1;
                } else {
                    TiempoSuspendido = Math.floor((Math.random() * 2) + 2); //TIEMPO QUE SE DEMORAN EN ColaSus 2-4
                    var temp = ColaSusC.extraerPrimero();
                    ColaLisC.insertarUltimo(temp.proceso, temp.tiempo, temp.tiempo, nodo.recurso, "Listo");
                    ColaLisC.ordenarQuantum(CantidadProcesosC);
                    estadosArrC[temp.proceso - 1] = "Listo";
                    DiagramarColaC(0);
                    DiagramarColaC(2);
                }
            }
            if (!ColaBloqC.vacia()) {
                var temp = ColaBloqC.extraerPrimero();
                if (!TiempoT && ColaLisC.vacia()) {
                    DiagramarGantC(temp.proceso - 1);
                }

                if (recursoBloq(temp)) {

                    //TiempoBloqueado = Math.floor((Math.random()*2)+2);//TIEMPO QUE SE DEMORAN EN ColaBloq 2-4
                    //var temp = ColaBloqC.extraerPrimero();
                    ColaLisC.insertarUltimo(temp.proceso, temp.tiempo, temp.tiempo, temp.recurso, "Listo", temp.prioridad);
                    ColaLisC.ordenarQuantum(CantidadProcesosB);
                    estadosArrC[temp.proceso - 1] = "Listo";
                    DiagramarColaC(0);
                    DiagramarColaC(1);
                    //DiagramarGantC(nodo.proceso-1);
                } else {
                    ColaBloqC.insertarUltimo(temp.proceso, temp.tiempo, temp.tiempo, temp.recurso, "Bloqueado", temp.prioridad);
                    estadosArrC[temp.proceso - 1] = "Bloqueado";
                    ColaBloqC.ordenarQuantum(CantidadProcesos);
                }

            }
            if (nAtendidos == CantidadProcesosC) {
                $("#mensajeC").html("Todos los procesos se han atendido exitosamente!");
                clearInterval(hilo);
                ct += clock;
                cpt += CantidadProcesos;
                stt += sumaTiempos;
                calcularMetrica3(CantidadProcesos, clock, sumaTiempos);
            }
        }
    }, 50); //<---VELOCIDAD DEL HILO EN MS
}


function DiagramarCola(i) {
    var text = "";
    var textoCola = "";
    var F = function() {};
    var nodo;
    switch (i) {
        case 0:
            textoCola = "#listos";
            F.prototype = ColaLis;
            break;
        case 1:
            textoCola = "#bloqueados";
            F.prototype = ColaBloq;
            break;
        case 2:
            textoCola = "#suspendidos";
            F.prototype = ColaSus;
            break;
        case 3:
            textoCola = "#terminados";
            F.prototype = ColaTer;
            break;
    }
    var cola = new F();
    text += "<ul class='lista'>";
    while (!cola.vacia()) {
        nodo = cola.extraerPrimero();
        text += "<li><p>proceso " + nodo.proceso + "  " + nodo.tiempo + "</p></li>";
    }
    text += "</ul>";
    $(textoCola).html(text);
}

function DiagramarColaB(i) {
    var text = "";
    var textoCola = "";
    var F = function() {};
    var nodo;
    switch (i) {
        case 0:
            textoCola = "#listosB";
            F.prototype = ColaLisB;
            break;
        case 1:
            textoCola = "#bloqueadosB";
            F.prototype = ColaBloqB;
            break;
        case 2:
            textoCola = "#suspendidosB";
            F.prototype = ColaSusB;
            break;
        case 3:
            textoCola = "#terminadosB";
            F.prototype = ColaTerB;
            break;
    }
    var cola = new F();
    text += "<ul class='lista'>";
    while (!cola.vacia()) {
        nodo = cola.extraerPrimero();
        text += "<li><p>proceso " + nodo.proceso + "  " + nodo.tiempo + "</p></li>";
    }
    text += "</ul>";
    $(textoCola).html(text);
}

function DiagramarColaC(i) {
    var text = "";
    var textoCola = "";
    var F = function() {};
    var nodo;
    switch (i) {
        case 0:
            textoCola = "#listosC";
            F.prototype = ColaLisC;
            break;
        case 1:
            textoCola = "#bloqueadosC";
            F.prototype = ColaBloqC;
            break;
        case 2:
            textoCola = "#suspendidosC";
            F.prototype = ColaSusC;
            break;
        case 3:
            textoCola = "#terminadosC";
            F.prototype = ColaTerC;
            break;
    }
    var cola = new F();
    text += "<ul class='lista'>";
    while (!cola.vacia()) {
        nodo = cola.extraerPrimero();
        text += "<li><p>proceso " + nodo.proceso + "  " + nodo.tiempo + "</p></li>";
    }
    text += "</ul>";
    $(textoCola).html(text);
}

function TransicionDibujo(nodo, n) {
    $("#anim").html("proceso " + nodo.proceso);
    if (n == 1) {
        var w = $(window).width();
        var h = $(window).height();
        var w1 = (w * 0.41) + "px";
        $("#proceso").animate({ opacity: '0' }, 400);
        $("#anim").animate({ opacity: '1' }, 0);
        $("#anim").offset({ top: h * 0.4, left: w * 0.1 });
        $("#anim").animate({ left: w1, top: '140px', width: '260px' }, 300);
        $("#anim").animate({ opacity: '0' }, 200);
        $("#proceso").animate({ opacity: '1' }, 0);
    }
}

function TransicionDibujoB(nodo, n) {
    $("#animB").html("proceso " + nodo.proceso);
    if (n == 1) {
        var w = $(window).width();
        var h = $(window).height();
        var w1 = (w * 0.41) + "px";
        $("#procesoB").animate({ opacity: '0' }, 400);
        $("#animB").animate({ opacity: '1' }, 0);
        $("#animB").offset({ top: h * 0.4, left: w * 0.1 });
        $("#animB").animate({ left: w1, top: '140px', width: '260px' }, 300);
        $("#animB").animate({ opacity: '0' }, 200);
        $("#procesoB").animate({ opacity: '1' }, 0);
    }
}

function TransicionDibujoC(nodo, n) {
    $("#animC").html("proceso " + nodo.proceso);
    if (n == 1) {
        var w = $(window).width();
        var h = $(window).height();
        var w1 = (w * 0.41) + "px";
        $("#procesoC").animate({ opacity: '0' }, 400);
        $("#animC").animate({ opacity: '1' }, 0);
        $("#animC").offset({ top: h * 0.4, left: w * 0.1 });
        $("#animC").animate({ left: w1, top: '140px', width: '260px' }, 300);
        $("#animC").animate({ opacity: '0' }, 200);
        $("#procesoC").animate({ opacity: '1' }, 0);
    }
}

function DiagramarProceso(nodo) {
    var text = "";
    if (nodo != null) {
        text += "<p>proceso " + nodo.proceso;
        text += "<p>Tiempo de Ejecución:" + nodo.tiempo;
        text += "<p> Recurso :" + nodo.recurso.nombre;

    } else {
        $("#proceso").animate({ opacity: '0' }, 100);
    }
    $("#proceso").html(text);
}

function DiagramarProcesoB(nodo) {
    var text = "";
    if (nodo != null) {
        text += "<p>proceso " + nodo.proceso;
        text += "<p>Tiempo de Ejecución:" + nodo.tiempo;
        text += "<p> Recurso :" + nodo.recurso.nombre;

    } else {
        $("#procesoB").animate({ opacity: '0' }, 100);
    }
    $("#procesoB").html(text);
}

function DiagramarProcesoC(nodo) {
    var text = "";
    if (nodo != null) {
        text += "<p>proceso " + nodo.proceso;
        text += "<p>Tiempo de Ejecución:" + nodo.tiempo;
        text += "<p> Recurso :" + nodo.recurso.nombre;


    } else {
        $("#procesoC").animate({ opacity: '0' }, 100);
    }
    $("#procesoC").html(text);
}

function bloqueo(n) {
    var bloqueo = Math.floor((Math.random() * 100) + 1);
    var b = false;
    if (bloqueo <= n) {
        b = true;
    }
    return b;
}

function DiagramarGant(n) {
    ctx.fillStyle = "rgb(64, 149, 206)";
    ctx.font = "20px Arial";
    for (i = 0; i < CantidadProcesos; i++) {
        if (i == n) {
            gant[i].push(1);
        } else {
            gant[i].push(0);
        }
        ctx.fillText("proceso" + (i + 1), 10, 22 * (i + 1));
    }
    for (i = 0; i < CantidadProcesos; i++) {
        var ultimo = gant[i].length - 1;
        if (gant[i][ultimo] == 1) {
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillRect(100 + Math.round(gant[i].length / (CantidadProcesos * 0.2)), 5 + (22 * i), 1, 20);
        } else {
            if (estadosArr[i] == "Bloqueado") {
                ctx.fillStyle = "rgb(255, 0, 234)";
                ctx.fillRect(100 + Math.round(gant[i].length / (CantidadProcesos * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArr[i] == "Suspendido") {
                ctx.fillStyle = "#FACC2E";
                ctx.fillRect(100 + Math.round(gant[i].length / (CantidadProcesos * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArr[i] == "Nuevo") {
                ctx.fillStyle = "rgb(26, 138, 104)";
                ctx.fillRect(100 + Math.round(gant[i].length / (CantidadProcesos * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArr[i] == "Terminado") {
                ctx.fillStyle = "#58D3F7";
                ctx.fillRect(100 + Math.round(gant[i].length / (CantidadProcesos * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArr[i] == "Listo") {
                ctx.fillStyle = "#rgb(255, 123, 0)";
                ctx.fillRect(100 + Math.round(gant[i].length / (CantidadProcesos * 0.2)), 5 + (22 * i), 1, 20);
            }
        }
    }

}

function DiagramarGantB(n) {
    ctxB.fillStyle = "rgb(64, 149, 206)";
    ctxB.font = "20px Arial";
    for (i = 0; i < CantidadProcesosB; i++) {
        if (i == n) {
            gantB[i].push(1);
        } else {
            gantB[i].push(0);
        }
        ctxB.fillText("proceso" + (i + 1), 10, 22 * (i + 1));
    }
    for (i = 0; i < CantidadProcesosB; i++) {
        var ultimo = gantB[i].length - 1;
        if (gantB[i][ultimo] == 1) {
            ctxB.fillStyle = "rgb(255, 0, 0)";
            ctxB.fillRect(100 + Math.round(gantB[i].length / (CantidadProcesosB * 0.2)), 5 + (22 * i), 1, 20);
        } else {
            if (estadosArrB[i] == "Bloqueado") {
                ctxB.fillStyle = "rgb(255, 0, 234)";
                ctxB.fillRect(100 + Math.round(gantB[i].length / (CantidadProcesosB * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArrB[i] == "Suspendido") {
                ctxB.fillStyle = "#FACC2E";
                ctxB.fillRect(100 + Math.round(gantB[i].length / (CantidadProcesosB * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArrB[i] == "Nuevo") {
                ctxB.fillStyle = "rgb(26, 138, 104)";
                ctxB.fillRect(100 + Math.round(gantB[i].length / (CantidadProcesosB * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArrB[i] == "Terminado") {
                ctxB.fillStyle = "#58D3F7";
                ctxB.fillRect(100 + Math.round(gantB[i].length / (CantidadProcesosB * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArrB[i] == "Listo") {
                ctxB.fillStyle = "rgb(255, 123, 0)";
                ctxB.fillRect(100 + Math.round(gantB[i].length / (CantidadProcesosB * 0.2)), 5 + (22 * i), 1, 20);
            }
        }
    }
}

function DiagramarGantC(n) {
    ctxC.fillStyle = "rgb(64, 149, 206)";
    ctxC.font = "20px Arial";
    for (i = 0; i < CantidadProcesosC; i++) {
        if (i == n) {
            gantC[i].push(1);
        } else {
            gantC[i].push(0);
        }
        ctxC.fillText("proceso" + (i + 1), 10, 22 * (i + 1));
    }
    for (i = 0; i < CantidadProcesosC; i++) {
        var ultimo = gantC[i].length - 1;
        if (gantC[i][ultimo] == 1) {
            ctxC.fillStyle = "rgb(255, 0, 0)";
            ctxC.fillRect(100 + Math.round(gantC[i].length / (CantidadProcesosC * 0.2)), 5 + (22 * i), 1, 20);
        } else {
            if (estadosArrC[i] == "Bloqueado") {
                ctxC.fillStyle = "rgb(255, 0, 234)";
                ctxC.fillRect(100 + Math.round(gantC[i].length / (CantidadProcesosC * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArrC[i] == "Suspendido") {
                ctxC.fillStyle = "#FACC2E";
                ctxC.fillRect(100 + Math.round(gantC[i].length / (CantidadProcesosC * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArrC[i] == "Nuevo") {
                ctxC.fillStyle = "rgb(26, 138, 104)";
                ctxC.fillRect(100 + Math.round(gantC[i].length / (CantidadProcesosC * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArrC[i] == "Terminado") {
                ctxC.fillStyle = "#58D3F7";
                ctxC.fillRect(100 + Math.round(gantC[i].length / (CantidadProcesosC * 0.2)), 5 + (22 * i), 1, 20);
            }
            if (estadosArrC[i] == "Listo") {
                ctxC.fillStyle = "rgb(255, 123, 0)";
                ctxC.fillRect(100 + Math.round(gantC[i].length / (CantidadProcesosC * 0.2)), 5 + (22 * i), 1, 20);
            }
        }
    }
}

function bloquearRecurso(nodo) {
    nodo.recurso.estado = 1;
    for (var i = 0; i < Disp.length; i++) {
        if (Disp[i].nombre == nodo.recurso.nombre) {
            Disp[i].estado = 1;
        }
    }
}

function recursoBloq(nodo) {
    var retorno = true;
    for (var i = 0; i < Disp.length; i++) {
        if (Disp[i].nombre == nodo.recurso.nombre && Disp[i].estado == 1) {
            retorno = false;
        }
    }
    return retorno;
}

function LiberarRec(nodo) {
    nodo.recurso.estado = 0;
    for (var i = 0; i < Disp.length; i++) {
        if (Disp[i].nombre == nodo.recurso.nombre) {
            Disp[i].estado = 0;
        }
    }
}

function mensaje(p, r) {
    var text = "Proceso " + p.proceso + ": ";
    if (r == 0) {
        for (var i = 0; i < Disp.length; i++) {
            if (Disp[i].nombre == p.recurso.nombre) {
                text += p.recurso.nombre + " " + "Ocupado   ";
                for (var j = 0; j < Disp.length; j++) {
                    text += " " + Disp[j].estado;
                }
            }
        }

        $("#mensaje").html("<p>" + text + "</p>");
        $("#mensaje").show();
        //$( "#mensaje" ).fadeOut( 4000, function() {});
    } else if (r == 1) {
        $("#respuesta").html("<p>" + text + "</p>");
        $("#respuesta").show();
        $("#respuesta").fadeOut(4000, function() {});
    }
}

function mensajeB(p, r) {
    var text = "Proceso " + p.proceso + ": ";
    if (r == 0) {
        for (var i = 0; i < Disp.length; i++) {
            if (Disp[i].nombre == p.recurso.nombre) {
                text += p.recurso.nombre + " " + "Ocupado   ";
                for (var j = 0; j < Disp.length; j++) {
                    text += " " + Disp[j].estado;
                }
            }
        }
        $("#mensajeB").html("<p>" + text + "</p>");
        $("#mensajeB").show();
        //$( "#mensaje" ).fadeOut( 4000, function() {});
    } else if (r == 1) {
        $("#respuestaB").html("<p>" + text + "</p>");
        $("#respuestaB").show();
        $("#respuestaB").fadeOut(4000, function() {});
    }
}

function mensajeC(p, r) {
    var text = "Proceso " + p.proceso + ": ";
    if (r == 0) {
        for (var i = 0; i < Disp.length; i++) {
            if (Disp[i].nombre == p.recurso.nombre) {
                text += p.recurso.nombre + " " + "Ocupado   ";
                for (var j = 0; j < Disp.length; j++) {
                    text += " " + Disp[j].estado;
                }
            }
        }
        $("#mensajeC").html("<p>" + text + "</p>");
        $("#mensajeC").show();
        //$( "#mensaje" ).fadeOut( 4000, function() {});
    } else if (r == 1) {
        $("#respuestaC").html("<p>" + text + "</p>");
        $("#respuestaC").show();
        $("#respuestaC").fadeOut(4000, function() {});
    }
}

function calcularMetrica1(cp, c, st) {
    var metrica = 0;
    metrica = (c - st) / cp;

    $("#metricas1").click(function() {
        $("#met1").html(metrica + " Milisegundos");
    });

    $("#metricas1").click(function() {
        $("#t1m").html(c + " Milisegundos");
    });

    $("#metricas1").click(function() {
        $("#e1").html(c - st + " Milisegundos");
    });
    $("#metricas1").click(function() {
        $("#p1").html(cp + " Procesos");
    });
}

function calcularMetrica2(cp, c, st) {
    var metrica = 0;
    metrica = (c - st) / cp;

    $("#metricas2").click(function() {
        $("#met2").html(metrica + " Milisegundos");
    });

    $("#metricas2").click(function() {
        $("#t2m").html(c + " Milisegundos");
    });

    $("#metricas2").click(function() {
        $("#e2").html(c - st + " Milisegundos");
    });
    $("#metricas2").click(function() {
        $("#p2").html(cp + " Procesos");
    });
}

function calcularMetrica3(cp, c, st) {
    var metrica = 0;
    metrica = (c - st) / cp;

    $("#metricas3").click(function() {
        $("#met3").html(metrica + " Milisegundos");
    });

    $("#metricas3").click(function() {
        $("#t3m").html(c + " Milisegundos");
    });

    $("#metricas3").click(function() {
        $("#e3").html(c - st + " Milisegundos");
    });
    $("#metricas3").click(function() {
        $("#p3").html(cp + " Procesos");
    });
}

function calcularMetrica() {
    var metrica = 0;
    metrica = (ct - stt) / cpt;

    $("#metricasf").click(function() {
        $("#metf").html(metrica + " Milisegundos");
    });

    $("#metricasf").click(function() {
        $("#tf").html(ct + " Milisegundos");
    });

    $("#metricasf").click(function() {
        $("#ef").html(ct - stt + " Milisegundos");
    });
    $("#metricasf").click(function() {
        $("#pf").html(cpt + " Procesos");
    });
}