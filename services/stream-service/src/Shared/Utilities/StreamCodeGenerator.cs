namespace IncidentSphere.StreamService.Shared.Utilities;

public static class StreamCodeGenerator
{
    private const string Characters = "abcdefghijklmnopqrstuvwxyz";

    public static string Generate()
    {
        return $"{GeneratePart(3)}-{GeneratePart(4)}-{GeneratePart(3)}";
    }

    private static string GeneratePart(int length)
    {
        return new string(
            Enumerable.Range(0, length)
                .Select(_ =>
                    Characters[
                        Random.Shared.Next(Characters.Length)
                    ])
                .ToArray()
        );
    }
}