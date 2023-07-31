
using Microsoft.AspNetCore.Mvc;

namespace HairSalon.Solution.Controllers;

public class HomeController : Controller
{

  [HttpGet("/")]
  public ActionResult Index()
  {
    return View();
  }

}
