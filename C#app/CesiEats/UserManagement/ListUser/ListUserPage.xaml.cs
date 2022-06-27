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

namespace CesiEats.UserManagement.ListUser
{
    /// <summary>
    /// Logique d'interaction pour ListUserPage.xaml
    /// </summary>
    public partial class ListUserPage : Page
    {
        public ListUserViewModel VM { get; set; }
        public ListUserPage()
        {
            InitializeComponent();

            VM = new ListUserViewModel();

            DataContext = VM;
        }
        //Validate component selection, call on ValidateButton click
        private void Validate(object obj)
        {
            if (VM.SelectedUser == null)
                return;
        }
    }
}
