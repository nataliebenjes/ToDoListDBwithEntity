using System.Collections.Generic;

namespace HairSalon.Models
{
  public class Client
  {
    public string ClientId { get; set; }
    public int StylistId { get; set; }
    public string ClientName { get; set; }
    public string ClientDetails { get; set; }
    public Stylist Stylist { get; set; }
  }
}