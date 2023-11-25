using System.Diagnostics.CodeAnalysis;
using System.Runtime.Serialization;

namespace InmobiliariaApi.Exceptions;

[ExcludeFromCodeCoverage]
[Serializable]
public class BadRequestException : BusinessException
{
    public BadRequestException()
    {
    }

    public BadRequestException(string message) : base(message)
    {
    }

    public BadRequestException(string message, Exception innerException)
        : base(message, innerException)
    {
    }

    // Without this constructor, deserialization will fail
    protected BadRequestException(SerializationInfo info, StreamingContext context)
        : base(info, context)
    {
    }

}
