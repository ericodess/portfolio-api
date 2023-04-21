namespace Projects.Types.DTO
{
    public class ResponseWrapper<T>
    {
        public bool WasSuccessful { get; set; }
        public string? Message { get; set; }
        public T? Result { get; set; }
    }
}
