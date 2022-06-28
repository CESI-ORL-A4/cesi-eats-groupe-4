using System.ComponentModel;
using System.Diagnostics;
using System.Runtime.CompilerServices;


namespace CesiEats.UserManagement.Model
{
    public class User
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Birthdate { get; set; } = null;
        
        public string Email { get; set; } = "";
        public string Address { get; set; } = "";
        public int Id { get; set; } = 0;
        public string Password { get; set; } = "";

        private string role = "BASIC";

        public string Role
        {
            get { return role; }
            set
            {
                role = value;
                OnPropertyChanged();
                Trace.WriteLine(role);
            }
        }

        public User(string firstName, string lastName, string phone, string birthdate, string role, string email, string address, int id, string password="")
        {
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            Birthdate = birthdate;
            Role = role;
            Email = email;
            Address = address;
            Id = id;
            Password = password;
        }

        public User()
        {

        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}
