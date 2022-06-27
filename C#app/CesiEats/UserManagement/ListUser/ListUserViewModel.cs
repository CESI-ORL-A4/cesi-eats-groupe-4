using CesiEats.UserManagement.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace CesiEats.UserManagement.ListUser
{
    public class ListUserViewModel
    {
        public string EmailLabel = "Email";
        public string RoleLabel = "Role";
        public string AddressLabel = "Address";
        public ObservableCollection<User> Users { get; set; } = new ObservableCollection<User>();
        public User SelectedUser { get; set; } = new User();

        public event PropertyChangedEventHandler PropertyChanged;

        public ListUserViewModel()
        {
            User user = new User();
            user.Address = "addr";
            user.Email = "dnie@jdj.fr";
            user.Role = "ADMIN";
            Users.Add(user);
        }

        protected void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }

    }
}
