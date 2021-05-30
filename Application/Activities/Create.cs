using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest //nuk kthen kurgjo perqata se ka at pjesen <Activity>
        {
            public Activity Activity { get; set; }
            //parametri
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
//task<unit> veq i tregon api qe u kry detyra po skgthen kshtu kurgjo
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                //sperdoret async se veq per special values 
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}