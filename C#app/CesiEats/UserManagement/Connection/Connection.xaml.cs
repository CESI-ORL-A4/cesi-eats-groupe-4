using CesiEats.UserManagement.ListUser;
using CesiEats.UserManagement.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
            string token = "";
            HttpClient client = new HttpClient();
            var values = new Dictionary<string, string>
            {
                { "email",VM.userConnection.Email },
                { "password", VM.userConnection.Password }
            };

            string url = "http://localhost:8080/login";
            var data = new FormUrlEncodedContent(values);
            HttpResponseMessage response = null;
            try
            {
                response = await client.PostAsync(url, data);
            }
            catch
            {
                VM.userConnection.Errror = "Pas de connection";
            }
            
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine(response.Content.ToString());
            }                
            else
                VM.userConnection.Errror = response.Content.ToString();
            

        }
    }
}
