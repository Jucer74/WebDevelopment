namespace WebDev.Api
{
    using WebDev.Api.Context;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.SqlServer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.VisualStudio.Web.CodeGeneration.Design;

    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("CnnStr")));
        }
    }

}
