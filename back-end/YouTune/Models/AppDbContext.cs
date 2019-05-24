using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YouTune.Models;

namespace YouTune.Models
{
    public class AppDbContext :DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<PlaylistSong> PlaylistSong { get; set; }
        public DbSet<PlaylistSong> ArtistSong { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // songs - playlist many to many mapping mapping
            modelBuilder.Entity<PlaylistSong>()
                .HasKey(ps => new { ps.SongId, ps.PlaylistId });

            modelBuilder.Entity<PlaylistSong>()
                .HasOne(ps => ps.Song)
                .WithMany(s => s.PlaylistSongs)
                .HasForeignKey(ps => ps.SongId);

            modelBuilder.Entity<PlaylistSong>()
                .HasOne(ps => ps.Playlist)
                .WithMany(p => p.PlaylistSongs)
                .HasForeignKey(ps => ps.PlaylistId);


            // songs - artis many to many mapping mapping
            modelBuilder.Entity<ArtistSong>()
                .HasKey(ars => new { ars.SongId, ars.ArtistId });

            modelBuilder.Entity<ArtistSong>()
                .HasOne(ars => ars.Song)
                .WithMany(s => s.ArtistSongs)
                .HasForeignKey(ars => ars.SongId);

            modelBuilder.Entity<ArtistSong>()
                .HasOne(ars => ars.Artist)
                .WithMany(a => a.ArtistSongs)
                .HasForeignKey(ars => ars.ArtistId);
        }
        
    }
}
