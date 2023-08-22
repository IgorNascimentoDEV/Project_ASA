using Api.Domain.DTOs;
using Api.Domain.Models;
using AutoMapper;

namespace Api.Helpers
{
    public class ApiProfile : Profile
    {
        public ApiProfile()
        {
            CreateMap<ColaboradorModel, ColaboradorDto>();

            CreateMap<ColaboradorDto, ColaboradorModel>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        }
    }
}
