﻿using DevIO.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevIO.App.Extensions
{
    public class SumaryViewComponent : ViewComponent
    {
        private readonly INotificador _notificador;

        public SumaryViewComponent(INotificador notificador)
        {
            _notificador = notificador;
        }

        public async Task<IViewComponentResult> InvokeAsync() 
        {
            var notificacoes = await Task.FromResult(_notificador.ObterNotificacoes());

            notificacoes.ForEach(x => ViewData.ModelState.AddModelError(string.Empty, x.Mensagem));

            return View();
        }
    }
}
