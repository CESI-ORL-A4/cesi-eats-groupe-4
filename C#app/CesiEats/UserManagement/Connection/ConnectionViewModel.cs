using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;
using System.Windows.Input;
using CesiEats.UserManagement.Model;

namespace CesiEats.UserManagement.Connection
{
    public class ConnectionViewModel : INotifyPropertyChanged
    {
        public string Title { get; set; } = "Se connecter";

        public UserConnection userConnection { get; set; } =  new UserConnection();

        #region PropertyChanged

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
        #endregion
    }


}
