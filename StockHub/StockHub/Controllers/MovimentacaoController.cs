﻿using Microsoft.AspNetCore.Mvc;

namespace StockHub.Controllers
{
    public class MovimentacaoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
