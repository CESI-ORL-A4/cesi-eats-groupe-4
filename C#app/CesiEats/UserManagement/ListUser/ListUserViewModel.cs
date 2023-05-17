using CesiEats.UserManagement.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace CesiEats.UserManagement.ListUser
{
    public class ListUserViewModel
    {
        public string EmailLabel = "Email";
        public string RoleLabel = "Role";
        public string FirstNameLabel = "Prénom";
        public string LastNameLabel = "Nom";
        public string PhoneLabel = "Téléphone";
        public string BirthDateLabel = "Date de naissance";

        public string Title { get; set; } = "Liste des utilisateurs";
        public ObservableCollection<User> Users { get; set; } = new ObservableCollection<User>();
        public User SelectedUser { get; set; } = new User();
        public ICommand ManageUserCommand { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;

        public ListUserViewModel()
        {
        }

        protected void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }

    }
}
