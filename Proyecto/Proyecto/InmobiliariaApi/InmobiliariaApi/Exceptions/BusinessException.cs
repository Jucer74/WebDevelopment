using System.Diagnostics.CodeAnalysis;
using System.Runtime.Serialization;

namespace InmobiliariaApi.Exceptions;

/// <summary>
/// Base Business Exception
/// </summary>
[ExcludeFromCodeCoverage]
[Serializable]
public class BusinessException : Exception
{
    public BusinessException()
    {
    }

    public BusinessException(string message) : base(message)
    {
    }

    public BusinessException(string message, Exception innerException)
        : base(message, innerException)
    {
    }

    // Without this constructor, deserialization will fail
    protected BusinessException(SerializationInfo info, StreamingContext context)
        : base(info, context)
    {
    }
}
