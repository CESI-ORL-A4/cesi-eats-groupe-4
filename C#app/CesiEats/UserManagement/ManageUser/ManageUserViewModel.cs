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

namespace CesiEats.UserManagement.ManageUser
{
    public class ManageUserViewModel
    {
        public bool Create { get; set; } = false;
        public string Title { get; set; } = "Modification/Création de l'utilisateur";
        public User User { get; set; }
        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}
