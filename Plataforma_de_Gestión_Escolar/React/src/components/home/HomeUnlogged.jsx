import fondo from '/public/fondoHome.jpg';
function HomeUnlogged(){
    return (
        <>
            <section className="mb-24">
                <div
  className="flex justify-center items-center min-h-120 bg-center rounded-b-4xl"
  style={{ backgroundImage: `url(${fondo})` }}
>
  <h2 className="w-full bg-blue-200/90 p-12 text-4xl text-center text-gray-800 font-bold">
    Sistema de Gestión y de comunicación académica.
  </h2>
</div>
            </section>
            <section className="flex flex-col gap-12">
                <h3 className="w-full text-gray-600 font-semibold text-4xl text-center border-b ">
                    Preparamos tu institución para el futuro
                </h3>
                <div className="flex flex-wrap justify-center gap-12">
                    <div className="w-full max-w-70 bg-blue-50 p-4 border border-gray-300 rounded-2xl">
                        <h4 className="text-lg text-center text-gray-700 font-bold border-b mb-6">Optimiza el tiempo</h4>
                        <p className="text-gray-600">
                            Reduce el tiempo dedicado para cada tarea y los errores humanos que puedan ocurrir tanto para el equipo administrativo como para el personal docente, automatizando procesos previamente configurados. ¡Tus estudiantes se verán beneficiados y agradecidos!
                        </p>
                    </div>
                    <div className="w-full max-w-70 bg-blue-50 p-4 border border-gray-300 rounded-2xl">
                        <h4 className="text-lg text-center text-gray-700 font-bold border-b mb-6">Diseño responsivo</h4>
                        <p className="text-gray-600">
                            Nuestro software alojado en la nube, permite el acceso desde cualquier dispositivo con acceso a internet, ya sea de escritorio, tableta o smartphone. No es necesario instalar ni mantener hardware, o comprar licencias de software adicionales.
                        </p>
                    </div>
                    <div className="w-full max-w-70 bg-blue-50 p-4 border border-gray-300 rounded-2xl">
                        <h4 className="text-lg text-center text-gray-700 font-bold border-b mb-6">Seguridad</h4>
                        <p className="text-gray-600">
                            Los datos se almacenan en bases administradas bajo los más altos estándares de seguridad. El sistema cuenta con diferentes roles de acceso y adapta sus funcionalidades a cada uno. Administrativos, docentes y estudiantes consultan y registran información de acuerdo a sus responsabilidades.
                        </p>
                    </div>
                    <div className="w-full max-w-70 bg-blue-50 p-4 border border-gray-300 rounded-2xl">
                        <h4 className="text-lg text-center text-gray-700 font-bold border-b mb-6">Soporte dedicado</h4>
                        <p className="text-gray-600">
                            Delega en nosotros el monitoreo del sistema y el resguardo de la información, nuestro equipo de asistencia estará dedicado a brindarle soporte y ayuda online a los usuarios designados. ¡Nuestro compromiso es brindarte una mejor experiencia día a día!
                        </p>
                    </div>
                    <div className="w-full max-w-70 bg-blue-50 p-4 border border-gray-300 rounded-2xl">
                        <h4 className="text-lg text-center text-gray-700 font-bold border-b mb-6">Ahorro de dinero</h4>
                        <p className="text-gray-600">
                            No hace falta invertir en desarrollo de sistemas o en licenciamientos impagables, ni tampoco comprar, configurar o mantener costosos servidores en un centro de datos o en tu institución. Destina el dinero que actualmente se va en impresoras, papeles e impresiones, hacia fines más productivos.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )   
}

export default HomeUnlogged