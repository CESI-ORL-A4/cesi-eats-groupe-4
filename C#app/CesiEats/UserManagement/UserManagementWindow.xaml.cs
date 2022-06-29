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
using System.Windows.Shapes;
using System.IO;
using System.Threading;
using CesiEats.UserManagement.Connection;

namespace CesiEats.UserManagement
{
    /// <summary>
    /// Logique d'interaction pour UserManagementWindow.xaml
    /// </summary>
    public partial class UserManagementWindow : Window
    {
        public Frame SelectedFrame { get; set; }
        private FrameworkElement _dragControl;
        public string AssemblyVersion { get; set; } = "v1.0";
        public string Message { get; set; } = "Interface de Gestion des utilisateur CesiEats";
        public UserManagementWindow()
        {
            InitializeComponent();
            DataContext = this;
        }

        //Call on Window Initialization, use to set mainframe and drag and drop
        private void WindowLoaded(object sender, RoutedEventArgs e)
        {
            var desktopWorkingArea = SystemParameters.WorkArea;
            this.Top = desktopWorkingArea.Height / 2 - this.Height / 2;
            this.Left = desktopWorkingArea.Width / 2 - this.Width / 2;
            _dragControl = (FrameworkElement)this.FindName("rectDragControl");
            if (_dragControl != null)
            {
                _dragControl.MouseLeftButtonDown += Window_MouseLeftButtonDown;
            }
            _mainFrame.Navigate(new ConnectionPage());
        }

        /// <summary>
        /// Moove window
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Window_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            DragMove();
        }

        /// <summary>
        /// Close Window
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Btn_Close_Click(object sender, MouseButtonEventArgs e)
        {
            this.Close();
        }

        /// <summary>
        /// Return navigation onClick Button
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Btn_Navigate_Return_MouseDown(object sender, MouseButtonEventArgs e)
        {
            _mainFrame.GoBack();
        }
    }
}
