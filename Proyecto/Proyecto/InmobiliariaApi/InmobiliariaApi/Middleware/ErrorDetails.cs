using Newtonsoft.Json;

namespace InmobiliariaApi.Middleware;

/// <summary>
/// Error details with the StatusCode and the Message Error or Execption Message
/// </summary>
public class ErrorDetails
{
    /// <summary>
    /// Error Type Description
    /// </summary>
    public string ErrorType { get; set; } = null!;

    /// <summary>
    /// Mesage Error or Exception Message
    /// </summary>
    public List<string> Errors { get; set; } = null!;

    /// <summary>
    /// Serialize the Objet to response the Details
    /// </summary>
    /// <returns>The Json Serialized</returns>
    public override string ToString()
    {
        return JsonConvert.SerializeObject(this);
    }
}
