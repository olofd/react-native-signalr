using System;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace react_native_signalr.Hubs
{

    public class ChatHub : Hub, IDisposable
    {
        public string HelloServer(string message)
        {
            Clients.Caller.helloApp("You said:", message, "Server says hello!", (DateTime.Now).ToString(CultureInfo.InvariantCulture));
            return "I responeded by calling helloApp";
        }

        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }
    }
}