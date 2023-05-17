using CesiEats.UserManagement.ListUser;
using CesiEats.UserManagement.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Diagnostics;
using System.Windows.Threading;
using System.Threading;

namespace CesiEats.UserManagement.Connection
{
    /// <summary>
    /// Logique d'interaction pour Connection.xaml
    /// </summary>
    public partial class ConnectionPage : Page
    {
        public ConnectionViewModel VM { get; set; }
        public ConnectionPage()
        {
            InitializeComponent();

            VM = new ConnectionViewModel();

            DataContext = VM;
        }

        private async void ConnectAsync(object sender, RoutedEventArgs e)
        {
            var parameters = new Dictionary<string, string> { { "email", VM.userConnection.Email }, { "password", password.Password } };
            var encodedContent = new FormUrlEncodedContent(parameters);
            UserToken userToken = null;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://api-gateway.e073562a5ba0470182a1.northeurope.aksapp.io/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response = await client.PostAsync("auth/login/", encodedContent);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                userToken = await response.Content.ReadAsAsync<UserToken>();
                Trace.WriteLine(userToken.role);
                if(userToken.role == "TECHNIC")
                {
                    this.NavigationService.Navigate(new ListUserPage(userToken));
                }
                VM.userConnection.Errror = "Vous avez pas les droits";
                
            }
            else
            {
                string resultContent = await response.Content.ReadAsStringAsync();
                VM.userConnection.Errror = "Erreur dans la connexion";
            }
        }


        private void Navigate(UserToken userToken)
        {
            App.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (SendOrPostCallback)delegate
            {
                this.NavigationService.Navigate(new ListUserPage(userToken));
            }, null);
        }
    }
}
