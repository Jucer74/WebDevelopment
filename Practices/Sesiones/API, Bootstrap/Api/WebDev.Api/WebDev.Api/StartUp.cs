//namespace WebDev.Api
//{
//    using Microsoft.AspNetCore.Builder;
//    using Microsoft.AspNetCore.Hosting;
//    using Microsoft.EntityFrameworkCore;
//    using Microsoft.Extensions.Configuration;
//    using Microsoft.Extensions.DependencyInjection;
//    using Microsoft.Extensions.Hosting;
//    using Microsoft.OpenApi.Models;
//    using System;
//    using WebDev.Api.Context;

//    public class Startup
//    {
//        public Startup(IConfiguration configuration)
//        {
//            Configuration = configuration;
//        }

//        public IConfiguration Configuration { get; }

//        // This method gets called by the runtime. Use this method to add services to the container.
//        public void ConfigureServices(IServiceCollection services)
//        {
//            services.AddControllers();
//            services.AddDbContext<AppDbContext>(options => options.UseMySql(Configuration.GetConnectionString("CnnStr"), Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.34-mysql")));
//            services.AddSwaggerGen(s => s.SwaggerDoc("v1", new OpenApiInfo { Title = "User API", Version = "v1" }));
//        }

//        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//        {
//            if (env.IsDevelopment())
//            {
//                app.UseDeveloperExceptionPage();
//            }

//            app.UseHttpsRedirection();

//            app.UseRouting();

//            app.UseAuthorization();

//            app.UseEndpoints(endpoints =>
//            {
//                endpoints.MapControllers();
//            });

//            // Enable middleware to serve generated Swagger as a JSON endpoint.
//            app.UseSwagger();

//            // Enable middleware to serve swagger-ui (HTML. JS, CSS, etc.),
//            // specifying the Swagger JSON endpoint
//            app.UseSwaggerUI(s => s.SwaggerEndpoint("/swagger/v1/swagger.json", "Users API"));
//        }
//    }
//}