using CesiEats.UserManagement.APIConnection;
using CesiEats.UserManagement.Model;
using System;
using System.Collections.Generic;
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

namespace CesiEats.UserManagement.ManageUser
{
    /// <summary>
    /// Logique d'interaction pour ManageUserPage.xaml
    /// </summary>
    public partial class ManageUserPage : Page
    {
        public ManageUserViewModel VM { get; set; }
        public ManageUserPage(User user,bool create = false)
        {
            InitializeComponent();
            if (user.Id == 0)
                create = true;
            VM = new ManageUserViewModel
            {
                User = user,
                Create = create,
            };
            DataContext = VM;
        }

        private async void CreateUpdateUser(object sender, RoutedEventArgs e)
        {
            VM.User.Password = password.Password;
            if(VM.Create)
                await UserAPI.CreateUserAsync(VM.User);
            else
                await UserAPI.UpdateUserAsync(VM.User);
            this.NavigationService.GoBack();
        }

        private async void DeleteUser(object sender, RoutedEventArgs e)
        {
            await UserAPI.DeleteUserAsync(VM.User.Id.ToString());
            this.NavigationService.GoBack();
        }
    }
}
