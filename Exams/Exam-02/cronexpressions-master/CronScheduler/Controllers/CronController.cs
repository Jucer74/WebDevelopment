using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CronScheduler.Controllers
{
    public class CronController : Controller
    {
        // GET: Crone
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Advance()
        {
            return View();
        }
    }
}