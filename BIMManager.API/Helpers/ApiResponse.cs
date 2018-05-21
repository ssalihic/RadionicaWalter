namespace BIMManager.API.Helpers
{
    public class ApiResponse<T>
    {
        public ApiResponseMetadata Meta { get; set; }
        public T Result { get; set; }
    }
}
