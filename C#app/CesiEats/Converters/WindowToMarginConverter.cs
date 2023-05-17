using System;
using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace CesiEats.Converters
{
    public class WindowToMarginConverter : IValueConverter
    {
        // Recoit un objet BoutonPDA et vérifie si le background du bouton doit être grisé ou activé
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is double && (double)value == SystemParameters.WorkArea.Height)
            {
                return 0;
            }
            else
            {
                return 10;
            }
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}