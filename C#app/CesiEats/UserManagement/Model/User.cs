using System.ComponentModel;
using System.Runtime.CompilerServices;


namespace CesiEats.UserManagement.Model
{
    public class User
    {
        private string role = "";
        private string email = "";
        private string address = "";
        private int userId = 0;

        public string Role
        {
            get { return role; }
            set
            {
                role = value;
                OnPropertyChanged();
            }
        }
        public string Email
        {
            get { return email; }
            set
            {
                email = value;
                OnPropertyChanged();
            }
        }
        public string Address
        {
            get { return address; }
            set
            {
                address = value;
                OnPropertyChanged();
            }
        }
        public int UserId
        {
            get { return userId; }
            set
            {
                userId = value;
                OnPropertyChanged();
            }
        }
        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}
