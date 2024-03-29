﻿using System;
using System.IO;
using System.Windows.Data;
using System.Windows.Media.Imaging;

namespace CesiEats.Converters
{
    public class Base64ImageConverter : IValueConverter
    {
        //Convert base 64 image to BitmapImage
        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            if (!(value is string s))
                return null;

            BitmapImage bi = new BitmapImage();

            bi.BeginInit();
            bi.StreamSource = new MemoryStream(System.Convert.FromBase64String(s));
            bi.EndInit();

            return bi;
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}