﻿using Microsoft.AspNetCore.Mvc.Razor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevIO.App.Extensions
{
    public static class RazorExtensions
    {
        public static string FormaDocumento(this RazorPage page, int tipoPessoa, string documento) 
        {
            return tipoPessoa==1 ? Convert.ToUInt64(documento).ToString(@"000\.000\.000\-00") : Convert.ToUInt64(documento).ToString(@"00\.000\.000\/000\-00");
        }
    }
}
