using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Project_IV_API.Models;
using Project_IV_Models.Models;
using Microsoft.AspNetCore.Identity;
using Swashbuckle.AspNetCore.Swagger;
using Project_IV_Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Project_IV_API;
using AutoMapper;
using Project_IV_Models.Repositories.Interfaces;
using Project_IV_Models.Repositories;
using Microsoft.AspNetCore.Mvc.Formatters;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Rewrite;

namespace Project_IV_Backend
{
    public class Startup
    {
        private IHostingEnvironment _env;

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<Project_IV_APIContext>(options =>
                   options.UseSqlServer(Configuration.GetConnectionString("Project_IV_APIContext")));

            // Migrate database
            services.BuildServiceProvider().GetService<Project_IV_APIContext>().Database.Migrate();

            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = true;
            })
                .AddEntityFrameworkStores<Project_IV_APIContext>()
                .AddDefaultTokenProviders();

            services.AddTransient<SeedIdentity>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Tokens:Issuer"],
                        ValidAudience = Configuration["Tokens:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"]))
                    };
                    options.SaveToken = false;
                    options.RequireHttpsMetadata = false;
                });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1.0", new Info
                {
                    Title = "Project_IV_API",
                    Version = "v1.0"
                });
            });

            // Repositories
            services.AddScoped(typeof(IGenericRepo<>), typeof(GenericRepo<>));
            

            // Auto mapper
            services.AddAutoMapper();

            // CORS
            services.AddCors(cfg =>
            {
                cfg.AddPolicy("projectPolicy", builder =>
                {
                    builder
                     .AllowAnyMethod()
                     .AllowAnyHeader()
                     .WithOrigins("http://localhost:8080")
                     .AllowCredentials();
                });
            });

            // MVC
            services.AddMvc(options =>
            {
                if (!_env.IsProduction())
                {
                    options.SslPort = 44343;
                }

                options.Filters.Add(new RequireHttpsAttribute());
                options.RespectBrowserAcceptHeader = true;
                options.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter());
            })
            .AddJsonOptions(options =>
            {
                //circulaire referenties stoppen.
                options.SerializerSettings.ContractResolver =
                new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling =
                ReferenceLoopHandling.Ignore;
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, SeedIdentity seedIdentity)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("projectPolicy");
            app.UseRewriter(new RewriteOptions().AddRedirectToHttps(301, 44343));
            app.UseAuthentication();
            app.UseHttpsRedirection();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = "swagger"; //kan je dus aanpassen naar een ander uri
                c.SwaggerEndpoint("/swagger/v1.0/swagger.json", "Project_IV_API v1.0");
            });

            app.UseMvc();
            seedIdentity.SeedIdentityProject_IV_API().Wait();
        }
    }
}
