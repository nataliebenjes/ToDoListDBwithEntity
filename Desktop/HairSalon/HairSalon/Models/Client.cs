using System.Collections.Generic;

namespace HairSalon.Models
{
  public class Client
  {
    public string ClientId { get; set; }
    public int StylistId { get; set; }
    public string Name { get; set; }
    public string Details { get; set; }
  }
}