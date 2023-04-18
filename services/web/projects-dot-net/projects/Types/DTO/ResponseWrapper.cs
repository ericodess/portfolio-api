namespace Projects.Types.DTO
{
    public class ResponseWrapper<T>
    {
        public bool WasSuccessful { get; set; }
        public T? Result { get; set; }
    }
}
