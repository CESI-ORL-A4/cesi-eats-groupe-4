using CesiEats.Commands;
using CesiEats.UserManagement.APIConnection;
using CesiEats.UserManagement.ManageUser;
using CesiEats.UserManagement.Model;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
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

namespace CesiEats.UserManagement.ListUser
{
    /// <summary>
    /// Logique d'interaction pour ListUserPage.xaml
    /// </summary>
    public partial class ListUserPage : Page
    {
        public ListUserViewModel VM { get; set; }
        public UserToken userToken { get; set; }
        public ListUserPage(UserToken userToken)
        {
            this.userToken = userToken;
            UserAPI.Init(userToken);
            InitializeComponent();
            VM = new ListUserViewModel
            {
                ManageUserCommand = new RelayCommand(new Action<object>(ManageUser)),
            };
            DataContext = VM;
        }

        private async void ChargeUsers()
        {
            List<User> users = null;
            users = await UserAPI.GetUsersAsync();
            VM.Users.Clear();
            if(users != null)
            {
                foreach (User user in users)
                {
                    VM.Users.Add(user);
                }
            }

            
        }


        private void PageLoaded(object sender, RoutedEventArgs e)
        {
            ChargeUsers();
        }

        //Validate component selection, call on ValidateButton click
        private void ManageUser(object obj)
        {
            if (VM.SelectedUser == null)
                return;
            else
                this.NavigationService.Navigate(new ManageUserPage(VM.SelectedUser));
        }

        private void CreateUser(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new ManageUserPage(new User(),true));
        }
    }
}
