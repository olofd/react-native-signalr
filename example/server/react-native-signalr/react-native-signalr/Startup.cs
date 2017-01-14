using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(react_native_signalr.Startup))]

namespace react_native_signalr
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
