using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            //jemi tu map prej ni activity ne nje activity 
            //dmth e kqyrim titullin e nje activity na qe e percaktojme
            //e ja japim ni activitetit tjeter
        }
    }
}