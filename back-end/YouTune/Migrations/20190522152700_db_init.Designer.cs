﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using YouTune.Models;

namespace YouTune.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20190522152700_db_init")]
    partial class db_init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("YouTune.Models.Artist", b =>
                {
                    b.Property<long>("ArtistId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("ArtistId");

                    b.ToTable("Artists");
                });

            modelBuilder.Entity("YouTune.Models.Genre", b =>
                {
                    b.Property<long>("GenreId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("GenreId");

                    b.ToTable("Genres");
                });

            modelBuilder.Entity("YouTune.Models.Playlist", b =>
                {
                    b.Property<long>("PlaylistId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Title");

                    b.Property<long>("UserId");

                    b.HasKey("PlaylistId");

                    b.HasIndex("UserId");

                    b.ToTable("Playlists");
                });

            modelBuilder.Entity("YouTune.Models.PlaylistSong", b =>
                {
                    b.Property<long>("SongId");

                    b.Property<long>("PlaylistId");

                    b.HasKey("SongId", "PlaylistId");

                    b.HasIndex("PlaylistId");

                    b.ToTable("PlaylistSong");
                });

            modelBuilder.Entity("YouTune.Models.Report", b =>
                {
                    b.Property<long>("ReportId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("SongId");

                    b.Property<byte>("Status");

                    b.HasKey("ReportId");

                    b.HasIndex("SongId")
                        .IsUnique();

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("YouTune.Models.Role", b =>
                {
                    b.Property<long>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("YouTune.Models.Song", b =>
                {
                    b.Property<long>("SongId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("ArtistId");

                    b.Property<long>("GenreId");

                    b.Property<string>("Title");

                    b.Property<long>("YoutubeID");

                    b.HasKey("SongId");

                    b.HasIndex("ArtistId");

                    b.HasIndex("GenreId");

                    b.ToTable("Songs");
                });

            modelBuilder.Entity("YouTune.Models.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("Password");

                    b.Property<long>("RoleId");

                    b.Property<string>("Username");

                    b.HasKey("UserId");

                    b.HasIndex("RoleId")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("YouTune.Models.Playlist", b =>
                {
                    b.HasOne("YouTune.Models.User", "User")
                        .WithMany("Playlists")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("YouTune.Models.PlaylistSong", b =>
                {
                    b.HasOne("YouTune.Models.Playlist", "Playlist")
                        .WithMany("PlaylistSongs")
                        .HasForeignKey("PlaylistId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("YouTune.Models.Song", "Song")
                        .WithMany("PlaylistSongs")
                        .HasForeignKey("SongId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("YouTune.Models.Report", b =>
                {
                    b.HasOne("YouTune.Models.Song", "Song")
                        .WithOne("Report")
                        .HasForeignKey("YouTune.Models.Report", "SongId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("YouTune.Models.Song", b =>
                {
                    b.HasOne("YouTune.Models.Artist", "Artist")
                        .WithMany("Songs")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("YouTune.Models.Genre", "Genre")
                        .WithMany("Songs")
                        .HasForeignKey("GenreId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("YouTune.Models.User", b =>
                {
                    b.HasOne("YouTune.Models.Role", "Role")
                        .WithOne("user")
                        .HasForeignKey("YouTune.Models.User", "RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}