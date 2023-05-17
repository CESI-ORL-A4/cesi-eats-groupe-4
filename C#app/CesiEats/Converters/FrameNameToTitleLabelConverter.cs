using System;
using System.Globalization;
using System.Windows.Controls;
using System.Windows.Data;

namespace CesiEats.Converters
{
    public class FrameNameToTitleLabelConverter : IValueConverter
    {
        // Recoit un objet BoutonPDA et vérifie si le background du bouton doit être grisé ou activé
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (!(value is Frame frame))
                return "";
            switch (frame.Name)
            {
                case "":
                    return "a";
                default:
                    return "";
            }
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
